import ActionNode, { IActionNode } from "./ActionNode";
import { IBlockInstance } from "../../BlockInstance";

export interface IBooleanAction extends IActionNode {
  falseTargets: string[];
  trueTargets: string[];
}

export enum BooleanConnectionKey{
    INPUT = 'i',
    FALSE = 'f',
    TRUE = 't'
}

export default class BooleanAction extends ActionNode implements IBooleanAction{
    readonly actionKey: string = "BOOLEAN";
    falseTargets: string[];
    trueTargets: string[];

    constructor(id: string, parentNodeIDs: string[] = [], block?: IBlockInstance, returnKey?: string, trueTargets?: string[], falseTargets?: string[]){
        super(id, parentNodeIDs, block, returnKey);
        this.trueTargets = trueTargets || [];
        this.falseTargets = falseTargets || [];
    }

    private getConnectionList(connectionKey: BooleanConnectionKey): string[]{
        switch(connectionKey){
            case BooleanConnectionKey.INPUT:
                return this.parentNodeIDs;
            case BooleanConnectionKey.FALSE:
                return this.falseTargets;
            case BooleanConnectionKey.TRUE:
                return this.trueTargets;
        }
    }

    public serialize(): IBooleanAction{
        return {
            ...super.serialize(),
            falseTargets: this.falseTargets,
            trueTargets: this.trueTargets
        }
    }

    public addConnection(toId: string, connectionKey: BooleanConnectionKey): void {
        const connections = this.getConnectionList(connectionKey);
        if(!connections.includes(toId)){
            connections.push(toId);
        }
    }
    public removeConnection(fromId: string, connectionKey: BooleanConnectionKey): void {
        const connections = this.getConnectionList(connectionKey);
        const index = connections.indexOf(fromId);
        if (index > -1) {
            connections.splice(index, 1);
        }
    }
}