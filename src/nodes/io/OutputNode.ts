import AbstractNode, { IAbstractNode } from "../AbstractNode";
import { IOutputDef } from './OutputDef';

export interface IOutputNode extends IAbstractNode{
    outputInstance: IOutputDef;
}

export default class OutputNode extends AbstractNode implements IOutputNode{
    addConnection(toId: string, connectionKey: string): void {
        throw new Error("Method not implemented.");
    }
    removeConnection(fromId: string, connectionKey: string): void {
        throw new Error("Method not implemented.");
    }
    outputInstance: IOutputDef;

    
}