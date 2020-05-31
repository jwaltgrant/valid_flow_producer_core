import AbstractNode, { IAbstractNode } from "../AbstractNode";

export interface IOutputInstance{

}

export interface IOutputNode extends IAbstractNode{
    outputInstance: IOutputInstance;
}

export default class OutputNode extends AbstractNode implements IOutputNode{
    outputInstance: IOutputInstance;

    
}