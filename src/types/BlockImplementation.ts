import { IInputNode } from "../nodes/io/InputNode";
import { IOutputNode } from "../nodes/io/OutputNode";
import { IActionNode } from "../nodes/action/ActionNode";

export interface IBlockImplementation {
  blockKey: string;
  inputNode: IInputNode;
  outputNodes: IOutputNode[];
  actions: IActionNode[];
}
