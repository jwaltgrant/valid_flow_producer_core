import { IActionNode } from "./ActionNode";
import { IAbstractNode, IConnect, INodeActions } from "../AbstractNode";

export interface IBooleanAction extends IActionNode {
  falseTargets: string[];
  trueTargets: string[];
}

export enum BooleanConnectionKey{
    INPUT = 'i',
    FALSE = 'f',
    TRUE = 't'
}

export class BoolActions implements INodeActions<IBooleanAction>{
    public instanceOf(node: IAbstractNode): boolean{
        return ('falseTargets' in node) && ('trueTargets' in node);
    }
    public connectNode(connectionData: IConnect<IBooleanAction>): IBooleanAction{
        const connections = this.getConnectionList(connectionData.fromNode, connectionData.connectionKey);
        if(connections && !connections.includes(connectionData.toNodeID)){
            connections.push(connectionData.toNodeID);
        }
        return {...connectionData.fromNode}
    }

    public disconnectNode(connectionData: IConnect<IBooleanAction>): IBooleanAction{
        const connections = this.getConnectionList(
        connectionData.fromNode,
        connectionData.connectionKey
        );
        const index = connections.indexOf(connectionData.toNodeID);
        if (index > -1) {
        connections.splice(index, 1);
        }
        return {...connectionData.fromNode}
    }

    private getConnectionList(node: IBooleanAction, connectionKey: string): string[]{
        switch(connectionKey){
            case BooleanConnectionKey.INPUT:
                return node.parentNodeIDs;
            case BooleanConnectionKey.FALSE:
                return node.falseTargets;
            case BooleanConnectionKey.TRUE:
                return node.trueTargets;
        }
    }
}
