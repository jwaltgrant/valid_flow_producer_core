import AbstractNode, {
  IAbstractNode,
  IChildNode,
  instanceOfIChildNode,
} from "../AbstractNode";
import * as Block from "../blockInstance/BlockInstance";
import { IBlockDef } from "../../BlockDef";

export interface IActionNode extends IAbstractNode, IChildNode {
  readonly actionKey?: string;
  block?: Block.IBlockInstance;
  returnKey?: string;
}

export default abstract class ActionNode extends AbstractNode implements IActionNode{
    abstract readonly actionKey: string;
    block: Block.IBlockInstance;
    returnKey?: string;
    parentNodeIDs: string[];


    constructor(id: string, parentNodeIDs: string[] = [], block?: Block.IBlockInstance, returnKey?: string){
        super(id);
        this.block = block;
        this.returnKey = returnKey;
        this.parentNodeIDs = parentNodeIDs;
    }

    /**
     * Search through a list of nodes for all nodes which are up stream(ancensotrs) of this node
     * @param nodes Nodes to search through to find ancestors in
     */
    getAncenstorNodeIDs(nodes: AbstractNode[]): string[]{
      let ancestors: string[] = [];
      ancestors.push(...this.parentNodeIDs);
      for(const node of nodes){
        if (this.parentNodeIDs.indexOf(node.id) > -1 && instanceOfIChildNode(node)) {
          ancestors.push(...node.getAncenstorNodeIDs(nodes));
        }
      }
      return ancestors;
    }

    serialize(): IActionNode{
      return {
        ...super.serialize(),
        block: this.block,
        returnKey: this.returnKey,
        parentNodeIDs: this.parentNodeIDs,
        actionKey: this.actionKey
      }
    }
}

function findActionNode(state: IAbstractNode[], nodeID: string): IActionNode | null{
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
  if(!node){
    return state;
  }
  const index = state.indexOf(node);
  const _node = {
    ...node,
    block: Block.updateArg(node.block, argInstance),
  };
  state.splice(index, 1, _node)
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
    returnKey
  };
  state.splice(index, 1, _node);
  return [...state];
}
