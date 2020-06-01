import AbstractNode, { IAbstractNode } from "../AbstractNode";
import { IOutputDef } from './OutputDef';

export interface IOutputNode extends IAbstractNode{
    outputInstance: IOutputDef;
}

export default class OutputNode extends AbstractNode implements IOutputNode{
    outputInstance: IOutputDef;

    
}