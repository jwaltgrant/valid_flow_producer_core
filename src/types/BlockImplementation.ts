import { IInputNode } from "../nodes/io/InputNode";
import { IOutputNode } from "../nodes/io/OutputNode";
import { IActionNode } from "../nodes/action/ActionNode";

export interface IBlockImplementation {
  name: string;
  inputNode: IInputNode;
  outputNodes: IOutputNode[];
  actions: IActionNode[];
}
