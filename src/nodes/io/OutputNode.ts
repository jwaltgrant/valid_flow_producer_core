import { IAbstractNode } from "../AbstractNode";
import { IOutputDef } from './OutputDef';

export interface IOutputNode extends IAbstractNode{
    outputInstance: IOutputDef;
}