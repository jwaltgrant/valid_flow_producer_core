import { IAbstractNode, IConnect } from "../AbstractNode";
import { IArgInstance } from "../blockInstance/BlockInstance";
import { IBlockDef } from "../blockInstance/IBlockSet";

export enum NODE_ACTIONS {
  CONNECT = "na_connect",
  DISCONNECT = "na_disconnect",
  ADD_NODE = "na_add_node",
  REMOVE_NODE = "na_rm_node",
  SET_BLOCK = "na_set_block",
  SET_ARG = "na_set_arg",
  SET_RETURN_KEY = "na_set_ret_key",
  SET_DISPLAY_LABEL = "na_set_display_label",
}

export function connectNode(connectionData: IConnect<IAbstractNode>) {
  return {
    type: NODE_ACTIONS.CONNECT,
    ...connectionData,
  };
}

export function disconnectNode(connectionData: IConnect<IAbstractNode>) {
  return {
    type: NODE_ACTIONS.DISCONNECT,
    ...connectionData,
  };
}

export function addNode(node: IAbstractNode) {
  return {
    type: NODE_ACTIONS.ADD_NODE,
    node,
  };
}

export function removeNode(nodeID: string) {
  return {
    type: NODE_ACTIONS.REMOVE_NODE,
    nodeID,
  };
}

export function setBlock(
  nodeID: string,
  blockSetKey: string,
  blockDef: IBlockDef
) {
  return {
    type: NODE_ACTIONS.SET_BLOCK,
    nodeID,
    blockSetKey,
    blockDef,
  };
}

export function setArg(nodeID: string, argInstance: IArgInstance) {
  return {
    type: NODE_ACTIONS.SET_ARG,
    nodeID,
    argInstance,
  };
}

export function setReturnKey(nodeID: string, returnKey: string | null) {
  return {
    type: NODE_ACTIONS.SET_RETURN_KEY,
    nodeID,
    returnKey,
  };
}

export function setDisplayLabel(nodeID: string, displayLabel: string) {
  return {
    type: NODE_ACTIONS.SET_DISPLAY_LABEL,
    nodeID,
    displayLabel,
  };
}
