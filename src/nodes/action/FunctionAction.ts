import ActionNode, { IActionNode } from "./ActionNode";
import { IBlockInstance } from "../../BlockInstance";

export interface IFunctionAction extends IActionNode{
    targets: number[];
}

export default class FunctionAction extends ActionNode implements IFunctionAction{
    actionKey: string = 'FUNCTION';
    targets: number[];
    constructor(id: number, block?: IBlockInstance, returnKey?: string, targets?: number[]){
        super(id, block, returnKey);
        this.targets = targets || [];
    }

    static deserialize(data: IFunctionAction): FunctionAction{
        return new FunctionAction(data.id, data.block, data.returnKey, data.targets);
    }
}