import { INodeActions, IAbstractNode, IConnect } from "..";
import { IInputNode, INPUT_TYPE } from "./InputNode";
import { IOutputNode, OUTPUT_TYPE } from "./OutputNode";

class InputNodeActionClass implements INodeActions<IInputNode> {
  instanceOf(node: IAbstractNode): boolean {
    return node.type === INPUT_TYPE;
  }

  /**
   * Connect two nodes
   * @param connectionData Object containing all connection data
   */
  connectNode(connectionData: IConnect<IInputNode>): IInputNode {
    const connections = connectionData.fromNode.targets;
    if (connectionData.connectionKey !== "output") {
      throw new Error(
        `Unsupported connection key: ${connectionData.connectionKey}`
      );
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
  disconnectNode(connectionData: IConnect<IInputNode>): IInputNode {
    const connections = connectionData.fromNode.targets;
    if (connectionData.connectionKey !== "output") {
      throw new Error(
        `Unsupported connection key: ${connectionData.connectionKey}`
      );
    }
    const index = connections.indexOf(connectionData.toNodeID);
    if (index === -1) {
      return connectionData.fromNode;
    }
    connections.splice(index, 1);
    return { ...connectionData.fromNode };
  }
}

class OutputNodeActionClass implements INodeActions<IOutputNode> {
  instanceOf(node: IAbstractNode): boolean {
    return node.type === OUTPUT_TYPE;
  }

  /**
   * Connect two nodes
   * @param connectionData Object containing all connection data
   */
  connectNode(connectionData: IConnect<IOutputNode>): IOutputNode {
    const connections = connectionData.fromNode.parentNodeIDs;
    if (connectionData.connectionKey !== "input") {
      throw new Error(
        `Unsupported connection key: ${connectionData.connectionKey}`
      );
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
    if (connectionData.connectionKey !== "input") {
      throw new Error(
        `Unsupported connection key: ${connectionData.connectionKey}`
      );
    }
    const index = connections.indexOf(connectionData.toNodeID);
    if (index === -1) {
      return connectionData.fromNode;
    }
    connections.splice(index, 1);
    return { ...connectionData.fromNode };
  }
}

const InActions = new InputNodeActionClass();

const OutActions = new OutputNodeActionClass();
export { InActions, OutActions };
