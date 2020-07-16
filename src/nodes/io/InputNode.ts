import { IAbstractNode, initAbstractNode } from "../AbstractNode";

export interface IInputNode extends IAbstractNode {
  targets: string[];
}

export const INPUT_TYPE = "INPUT";

export function initInputNode(id?: string): IInputNode {
  return {
    ...initAbstractNode(INPUT_TYPE, id),
    targets: [],
  };
}
