import AbstractNode, { IAbstractNode } from "../AbstractNode";
import { IBlockInstance } from "../../BlockInstance";

export interface IActionNode extends IAbstractNode{
    readonly actionKey: string;
    returnKey: string;
}

export default abstract class ActionNode extends AbstractNode implements IActionNode{
    abstract readonly actionKey: string;
    returnKey: string;

    constructor(id: number, block?: IBlockInstance, returnKey?: string){
        super(id, block);
        this.returnKey = returnKey;
    }
}