import { IAbstractNode, initChildNode, IChildNode, INodeActions, IConnect } from "../AbstractNode";
import * as OutputDef from "./OutputDef";

export interface IOutputNode extends IChildNode {
  outputPairs: OutputDef.IOutputPair[];
}

export const OUTPUT_TYPE = 'OUTPUT';

export function instanceOfOutputNode(node: IAbstractNode) {
  return "outputPairs" in node;
}

/**
 * Initialize an empty IOputNode
 */
export function initOutputNode(id?: string): IOutputNode {
  return {
    ...initChildNode(OUTPUT_TYPE, id),
    outputPairs: [],
  };
}

export function addOutputPair(
  node: IOutputNode,
  pair: OutputDef.IOutputPair
): IOutputNode {
  if (node.outputPairs.find((p) => p.key === pair.key)) {
    throw new Error(`Key of name: ${pair.key} is taken`);
  }
  return {
    ...node,
    outputPairs: [...node.outputPairs, pair],
  };
}

export function updateOutPair(
  node: IOutputNode,
  pair: OutputDef.IOutputPair
): IOutputNode {
  const index = node.outputPairs.findIndex((_pair) => pair.key === _pair.key);
  if (index === -1) {
    return {
      ...node,
      outputPairs: [...node.outputPairs, pair],
    };
  }
  node.outputPairs.splice(index, 1, pair);
  return {
    ...node,
    outputPairs: [...node.outputPairs],
  };
}

/**
 * Remove a pair from the pairs
 * @param pairs Pairs to remove one from
 * @param pairKey Key of the pair to remove
 */
export function removeOutputPair(
  node: IOutputNode,
  pairKey: string
): IOutputNode {
  const index = node.outputPairs.findIndex((_pair) => pairKey === _pair.key);
  if (index === -1) {
    return node;
  }
  node.outputPairs.splice(index, 1);
  return {
    ...node,
    outputPairs: [...node.outputPairs],
  };
}

export class OutputNodeActions implements INodeActions<IOutputNode>{
  instanceOf(node: IAbstractNode): boolean {
    return node.type === OUTPUT_TYPE;
  }

  /**
   * Connect two nodes
   * @param connectionData Object containing all connection data
   */
  connectNode(connectionData: IConnect<IOutputNode>): IOutputNode {
    const connections = connectionData.fromNode.parentNodeIDs;
    if (connectionData.connectionKey !== 'input') {
      throw new Error(`Unsupported connection key: ${connectionData.connectionKey}`);
    }
    if (!connections.includes(connectionData.toNodeID)) {
      connections.push(connectionData.toNodeID);
    }
    return { ...connectionData.fromNode };
  }

  /**
   * Dicsonnect a node from another node
   * @param connectionData Object containg all connection data
   */
  disconnectNode(connectionData: IConnect<IOutputNode>): IOutputNode {
    const connections = connectionData.fromNode.parentNodeIDs;
    if (connectionData.connectionKey !== 'input') {
      throw new Error(`Unsupported connection key: ${connectionData.connectionKey}`);
    }
    const index = connections.indexOf(connectionData.toNodeID);
    if (index === -1) {
      return connectionData.fromNode;
    }
    connections.splice(index, 1);
    return { ...connectionData.fromNode };
  }

}
