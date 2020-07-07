import { IAbstractNode, initAbstractNode } from "../AbstractNode";

export interface IInputNode extends IAbstractNode {
  targets: string[];
}

export function initInputNode(id?: string): IInputNode{
  return {
    ...initAbstractNode(id),
    targets: []
  }
}
