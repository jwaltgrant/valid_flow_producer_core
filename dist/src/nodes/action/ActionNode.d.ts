import { IChildNode } from "../AbstractNode";
import * as Block from "../blockInstance/BlockInstance";
export interface IActionNode extends IChildNode {
    readonly actionKey?: string;
    block?: Block.IBlockInstance;
    returnKey?: string;
}
export declare function initActionNode(actionKey: string): IActionNode;
