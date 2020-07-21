import { IAbstractNode, IConnect, IActionNode } from "..";
import NodeActionRegistry from "../NodeActionsRegistry";
import { IBlockDef } from "../blockInstance/IBlockSet";
import {
  updateArg,
  IArgInstance,
  fromBlockDef,
} from "../blockInstance/BlockInstance";

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

export class ActionNodeHelpers {
  private static findActionNode(
    state: IAbstractNode[],
    nodeID: string
  ): IActionNode | null {
    const node: IActionNode = state.find((n) => n.id === nodeID) as IActionNode;
    if (!node || !("block" in node)) {
      return null;
    }
    return node;
  }

  static updateBlock(
    state: IAbstractNode[],
    nodeID: string,
    blockSetKey: string,
    blockDef: IBlockDef
  ) {
    const node: IActionNode = state.find((n) => n.id === nodeID) as IActionNode;
    if (!node || !("block" in node)) {
      return state;
    }
    const index = state.indexOf(node);
    const block = fromBlockDef({
      blockSetKey,
      blockDef,
      block: node.block,
    });
    const _node = { ...node, block };
    state.splice(index, 1, _node);
    return [...state];
  }

  static updateArg(
    state: IAbstractNode[],
    nodeID: string,
    argInstance: IArgInstance
  ) {
    const node = ActionNodeHelpers.findActionNode(state, nodeID);
    if (!node) {
      return state;
    }
    const index = state.indexOf(node);
    const _node = {
      ...node,
      block: updateArg(node.block, argInstance),
    };
    state.splice(index, 1, _node);
    return [...state];
  }

  static setReturnKey(
    state: IAbstractNode[],
    nodeID: string,
    returnKey: string | null
  ) {
    const node = ActionNodeHelpers.findActionNode(state, nodeID);
    if (!node) {
      return state;
    }
    const index = state.indexOf(node);
    const _node = {
      ...node,
      returnKey,
    };
    state.splice(index, 1, _node);
    return [...state];
  }

  static setDisplayLabel(
    state: IAbstractNode[],
    nodeID: string,
    displayLabel: string
  ): IAbstractNode[] {
    const node = ActionNodeHelpers.findActionNode(state, nodeID);
    if (!node) {
      return state;
    }
    const index = state.indexOf(node);
    const _node = {
      ...node,
      displayLabel,
    };
    state.splice(index, 1, _node);
    return [...state];
  }
}
