import { IInputNode } from "../nodes/io/InputNode";
import { IOutputNode } from "../nodes/io/OutputNode";
import { IActionNode } from "../nodes/action/ActionNode";
import { IArgDef } from "../nodes/blockInstance/ArgDef";

export interface IBlockImplementation {
  blockKey: string;
  args: IArgDef[];
  inputNode: IInputNode;
  outputNodes: IOutputNode[];
  actions: IActionNode[];
}
