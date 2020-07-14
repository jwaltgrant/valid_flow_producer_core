import { IAbstractNode, IChildNode } from "../AbstractNode";
import * as OutputDef from "./OutputDef";
export interface IOutputNode extends IChildNode {
    outputPairs: OutputDef.IOutputPair[];
}
export declare function instanceOfOutputNode(node: IAbstractNode): boolean;
/**
 * Initialize an empty IOputNode
 */
export declare function initOutputNode(id?: string): IOutputNode;
export declare function addOutputPair(node: IOutputNode, pair: OutputDef.IOutputPair): IOutputNode;
export declare function updateOutPair(node: IOutputNode, pair: OutputDef.IOutputPair): IOutputNode;
/**
 * Remove a pair from the pairs
 * @param pairs Pairs to remove one from
 * @param pairKey Key of the pair to remove
 */
export declare function removeOutputPair(node: IOutputNode, pairKey: string): IOutputNode;
