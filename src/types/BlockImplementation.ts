import { IInputNode } from "../nodes/io/InputNode";
import { IOutputNode } from "../nodes/io/OutputNode";
import { IActionNode } from "../nodes/action/ActionNode";


export interface IBlockImplementation {
    inputNode: IInputNode;
    outputNodes: IOutputNode[];
    actions: IActionNode[];
}
