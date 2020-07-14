import { IAbstractNode, IConnect } from "..";
import NodeActionRegistry from "../NodeActionsRegistry";

/**
 * Collection of Static Functions used by the NodeStore Reducer
 */
export class NodeHelpers {
  /**
   * Add a node to the state, ensuring no duplication of ID
   * @param state List of IAbstractNodes
   * @param node Node to add
   */
  static addNode(state: IAbstractNode[], node: IAbstractNode): IAbstractNode[] {
    const _node = state.find((n) => n.id === node.id);
    if (_node) {
      throw new Error(`Node ID: ${node.id} is taken`);
    }
    state.push(node);
    return [...state];
  }

  /**
   * Remove a node with provided ID from a list of nodes
   * @param state List of Nodes
   * @param nodeID ID of a node to remove
   */
  static removeNode(state: IAbstractNode[], nodeID: string): IAbstractNode[] {
    const node = state.find((n) => n.id === nodeID);
    if (!node) {
      return state;
    }
    const index = state.indexOf(node);
    state.splice(index, 1);
    return [...state];
  }

  /**
   * Find a node and up date connections
   * @param state List of Nodes
   * @param connectData IConnect with all needed (dis)connnection data
   * @param connect If the nodes should be connected (true) or disconnected
   */
  private static findAndCD(
    state: IAbstractNode[],
    connectData: IConnect<IAbstractNode>,
    connect: boolean
  ): { state: IAbstractNode[]; updated: boolean } {
    const index = state.findIndex((n) => n.id === connectData.fromNode.id);
    if (index === -1) {
      return { state, updated: false };
    }
    const connectedNode = connect
      ? NodeActionRegistry.connect(connectData)
      : NodeActionRegistry.disconnect(connectData);
    state.splice(index, 1, connectedNode);
    return { state, updated: true };
  }

  /**
   * Connect two nodes
   * @param state List of Nodes
   * @param conenctData Object containing all connection data
   */
  static connectNodes(
    state: IAbstractNode[],
    conenctData: IConnect<IAbstractNode>
  ): IAbstractNode[] {
    const _do = NodeHelpers.findAndCD(state, conenctData, true);
    if (_do.updated) {
      return [..._do.state];
    }
    return state;
  }

  /**
   * Disconnect two nodes
   * @param state List of Nodes
   * @param conenctData Object containing all disconnection data
   */
  static disconnectNodes(
    state: IAbstractNode[],
    conenctData: IConnect<IAbstractNode>
  ): IAbstractNode[] {
    const _do = NodeHelpers.findAndCD(state, conenctData, false);
    if (_do.updated) {
      return [..._do.state];
    }
    return state;
  }
}
