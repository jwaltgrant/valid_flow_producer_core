import { IAbstractNode, IChildNode, IConnect } from "../AbstractNode";
import { ISetBlock, IArgInstance } from "../blockInstance/BlockInstance";
import { IBlockInstance } from "../blockInstance/BlockInstance";

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

export function setBlock(nodeID: string, block: ISetBlock){
    return {
        type: NODE_ACTIONS.SET_BLOCK,
        nodeID,
        block
    }
}

export function setArg(block: IBlockInstance, arg: IArgInstance){
    return {
        type: NODE_ACTIONS.SET_ARG,
        block,
        arg
    }
}
