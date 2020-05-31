import ActionNode, { IActionNode } from "./ActionNode";
import { IBlockInstance } from "../../BlockInstance";

export interface IBooleanAction extends IActionNode{
    falseTargets: number[];
    trueTargets: number[];
}

export default class BooleanAction extends ActionNode implements IBooleanAction{
    readonly actionKey: string = "BOOLEAN";
    falseTargets: number[];
    trueTargets: number[];

    constructor(id: number, block?: IBlockInstance, returnKey?: string, trueTargets?: number[], falseTargets?: []){
        super(id, block, returnKey);
        this.trueTargets = trueTargets || [];
        this.falseTargets = falseTargets || [];
    }
}