import { IAbstractNode, IChildNode, initChildNode } from "../AbstractNode";
import * as Block from "../blockInstance/BlockInstance";
import { IBlockDef } from "../blockInstance/IBlockSet";

export interface IActionNode extends IChildNode {
  readonly actionKey?: string;
  block?: Block.IBlockInstance;
  returnKey?: string;
}

export function initActionNode(actionKey: string): IActionNode {
  return {
    ...initChildNode(),
    actionKey,
    block: Block.initBlockInstance(),
    returnKey: "",
  };
}
