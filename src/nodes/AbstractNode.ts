import FunctionActions from "./action/FunctionAction";
import { IActionNode, initActionNode } from "./action/ActionNode";

export interface INodeActions<T extends IAbstractNode> {
  instanceOf(node: IAbstractNode): boolean;
  connectNode(connectionData: IConnect<T>): T;
  disconnectNode(connectionData: IConnect<T>): T;
}

export interface IAbstractNode {
  id: string;
}

export function initAbstractNode(id?: string): IAbstractNode {
  return { id: id || "" };
}

/**
 * Parse through nodes recursively and find all ancestores of `forNode`
 * @param forNode Node to get all Ancestor IDs for
 * @param allNodes All Available nodes
 */
export function getAncenstorNodeIDs(
  forNode: IChildNode,
  allNodes: IAbstractNode[]
) {
  return getAncenstorNodes(forNode, allNodes).map((n) => n.id);
}

export function getAncenstorNodes(
  forNode: IChildNode,
  allNodes: IAbstractNode[]
): IAbstractNode[] {
  let ancestors: IAbstractNode[] = allNodes.filter((node) =>
    forNode.parentNodeIDs.includes(node.id)
  );
  for (const node of allNodes) {
    if (
      forNode.parentNodeIDs.indexOf(node.id) > -1 &&
      instanceOfIChildNode(node)
    ) {
      ancestors.push(...getAncenstorNodes(node, allNodes));
    }
  }
  return ancestors;
}

export function initChildNode(id?: string): IChildNode {
  return {
    ...initAbstractNode(id),
    parentNodeIDs: [],
  };
}

export interface IChildNode extends IAbstractNode {
  parentNodeIDs: string[];
}

export function instanceOfIChildNode(object: any): object is IChildNode {
  return "parentNodeIDs" in object;
}

export interface IConnect<T extends IAbstractNode> {
  fromNode: T;
  toNodeID: string;
  connectionKey: string;
}
