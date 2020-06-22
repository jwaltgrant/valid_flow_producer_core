import { IAbstractNode, IChildNode, IConnect } from "../AbstractNode";
import { ISetBlock, IArgInstance } from "../blockInstance/BlockInstance";
import { IBlockInstance } from "../blockInstance/BlockInstance";
import { IBlockDef } from "../../BlockDef";

export enum NODE_ACTIONS {
    CONNECT,
    DISCONNECT,
    ADD_NODE,
    REMOVE_NODE,
    SET_BLOCK,
    SET_ARG
}

export function connectNode(connectionData: IConnect<IAbstractNode>){
    return {
      type: NODE_ACTIONS.CONNECT,
      ...connectionData,
    };
}

export function disconnectNode(connectionData: IConnect<IAbstractNode>) {
    return {
        type: NODE_ACTIONS.DISCONNECT,
        ...connectionData
    };
}

export function addNode(node: IAbstractNode){
    return {
        type: NODE_ACTIONS.ADD_NODE,
        node
    };
}

export function removeNode(nodeID: string){
    return {
        type: NODE_ACTIONS.REMOVE_NODE,
        nodeID
    };
}


export function setBlock(nodeID: string, blockSetKey: string, blockDef: IBlockDef){
    return {
        type: NODE_ACTIONS.SET_BLOCK,
        nodeID,
        blockSetKey,
        blockDef
    }
}

export function setArg(nodeID: string, argInstance: IArgInstance){
    return {
      type: NODE_ACTIONS.SET_ARG,
      nodeID,
      argInstance,
    };
}
