import { IInputNode } from "../nodes/io/InputNode";
import { IOutputNode } from "../nodes/io/OutputNode";
import { IActionNode } from "../nodes/action/ActionNode";
import { IArgDef } from "../nodes/blockInstance/ArgDef";
import { IBlockDef } from "../nodes/blockInstance/IBlockSet";

export interface IBlockImplementation extends IBlockDef {
  inputNode: IInputNode;
  outputNodes: IOutputNode[];
  actions: IActionNode[];
}
