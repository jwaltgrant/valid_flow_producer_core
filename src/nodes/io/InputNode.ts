import { IAbstractNode } from "../AbstractNode";

export interface IInputNode extends IAbstractNode{
    targets: number[];
}
