import ActionNode, { IActionNode } from "./ActionNode";
import { IBlockInstance } from "../../BlockInstance";

export interface IVoidAction extends IActionNode{
    targets: number[];
}

export default class VoidAction extends ActionNode implements IVoidAction{
    actionKey: string = 'VOID';
    targets: number[];
    constructor(id: number, block?: IBlockInstance, returnKey?: string, targets?: number[]){
        super(id, block, returnKey);
        this.targets = targets || [];
    }

    static deserialize(data: IVoidAction): VoidAction{
        return new VoidAction(data.id, data.block, data.returnKey, data.targets);
    }
}