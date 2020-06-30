import { IAbstractNode, initAbstractNode } from "../AbstractNode";
import { IOutputDef, initOutputDef } from './OutputDef';

export interface IOutputNode extends IAbstractNode{
    outputInstance: IOutputDef;
}

export function initOutputNode(): IOutputNode {
    return {
        ...initAbstractNode(),
        outputInstance: initOutputDef()
    };
}
