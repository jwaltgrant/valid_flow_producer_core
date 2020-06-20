import ActionNode, { IActionNode } from "./ActionNode";
import { IBlockInstance } from "../../BlockInstance";
import { INodeActions, IAbstractNode, IConnect } from "../AbstractNode";

export interface IFunctionAction extends IActionNode{
    targets: string[];
}

export enum FunctionActionKey{
    INPUT = 'input',
    OUTPUT = 'output'
}

export class FunctionActions implements INodeActions<IFunctionAction> {
         public instanceOf(node: IAbstractNode): boolean {
           return "targets" in node;
         }
         public connectNode(connectionData: IConnect<IFunctionAction>) {
           const connections = this.getConnectionList(
             connectionData.parentNode,
             connectionData.connectionKey
           );
           if (
             connections &&
             !connections.includes(connectionData.childNodeID)
           ) {
             connections.push(connectionData.childNodeID);
           }
           return { ...connectionData.parentNode };
         }

         public disconnectNode(connectionData: IConnect<IFunctionAction>) {
           const connections = this.getConnectionList(
             connectionData.parentNode,
             connectionData.connectionKey
           );
           const index = connections.indexOf(connectionData.childNodeID);
           if (index > -1) {
             connections.splice(index, 1);
           }
           return { ...connectionData.parentNode };
         }

         private getConnectionList(
           node: IFunctionAction,
           connectionKey: string
         ): string[] {
           switch (connectionKey) {
             case FunctionActionKey.INPUT:
               return node.parentNodeIDs;
                case FunctionActionKey.OUTPUT:
                    return node.targets;
           }
         }
       }

export default class FunctionAction extends ActionNode implements IFunctionAction{
    actionKey: string = 'FUNCTION';
    targets: string[];
    constructor(id: string, parentNodeIDs: string[] = [], block?: IBlockInstance, returnKey?: string, targets?: string[]){
        super(id, parentNodeIDs, block, returnKey);
        this.targets = targets || [];
    }

    private getConnectionList(connectionKey: FunctionActionKey): string[]{
        return connectionKey === FunctionActionKey.INPUT
          ? this.parentNodeIDs
          : this.targets;
    }

    public serialize(): IFunctionAction{
        return {
            ...super.serialize(),
            targets: this.targets
        }
    }

    public static deserialize(data: IFunctionAction): FunctionAction{
        return new FunctionAction(data.id, data.parentNodeIDs, data.block, data.returnKey, data.targets);
    }

    public addConnection(toId: string, connectionKey: FunctionActionKey): void {
        const connections = this.getConnectionList(connectionKey);
        if(!connections.includes(toId)){
            connections.push(toId);
        }
    }
    public removeConnection(fromId: string, connectionKey: FunctionActionKey): void {
        const connections = this.getConnectionList(connectionKey);
        const index = connections.indexOf(fromId);
        if(index > -1){
            connections.splice(index, 1);
        }
    }
}