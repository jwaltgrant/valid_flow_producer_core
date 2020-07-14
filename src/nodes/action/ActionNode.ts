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

function findActionNode(
  state: IAbstractNode[],
  nodeID: string
): IActionNode | null {
  const node: IActionNode = state.find((n) => n.id === nodeID) as IActionNode;
  if (!node || !("block" in node)) {
    return null;
  }
  return node;
}

export function updateBlock(
  state: IAbstractNode[],
  nodeID: string,
  blockSetKey: string,
  blockDef: IBlockDef
) {
  const node: IActionNode = state.find((n) => n.id === nodeID) as IActionNode;
  if (!node || !("block" in node)) {
    return state;
  }
  const index = state.indexOf(node);
  const block = Block.fromBlockDef({
    blockSetKey,
    blockDef,
    block: node.block,
  });
  const _node = { ...node, block };
  state.splice(index, 1, _node);
  return [...state];
}

export function updateArg(
  state: IAbstractNode[],
  nodeID: string,
  argInstance: Block.IArgInstance
) {
  const node = findActionNode(state, nodeID);
  if (!node) {
    return state;
  }
  const index = state.indexOf(node);
  const _node = {
    ...node,
    block: Block.updateArg(node.block, argInstance),
  };
  state.splice(index, 1, _node);
  return [...state];
}

export function setReturnKey(
  state: IAbstractNode[],
  nodeID: string,
  returnKey: string | null
) {
  const node = findActionNode(state, nodeID);
  if (!node) {
    return state;
  }
  const index = state.indexOf(node);
  const _node = {
    ...node,
    returnKey,
  };
  state.splice(index, 1, _node);
  return [...state];
}
