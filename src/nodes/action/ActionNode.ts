import { IAbstractNode, IChildNode, initChildNode } from "../AbstractNode";
import * as Block from "../blockInstance/BlockInstance";
import { IBlockDef } from "../blockInstance/IBlockSet";

export interface IActionNode extends IChildNode {
  block?: Block.IBlockInstance;
  returnKey?: string;
}

export function initActionNode(type: string): IActionNode {
  return {
    ...initChildNode(type),
    block: Block.initBlockInstance(),
    returnKey: "",
  };
}
