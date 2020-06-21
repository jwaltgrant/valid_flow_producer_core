import { IAbstractNode, IChildNode, IConnect } from "../AbstractNode";

export enum NODE_ACTIONS {
    CONNECT,
    DISCONNECT,
    ADD_NODE,
    REMOVE_NODE
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
