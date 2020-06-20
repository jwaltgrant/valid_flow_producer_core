import { IAbstractNode, IChildNode, IConnect } from "../AbstractNode";

export enum NODE_ACTIONS {
    CONNECT,
    DISCONNECT
}

export function connectNode(connectionData: IConnect<IAbstractNode>){
    return {
      type: NODE_ACTIONS.CONNECT,
      ...connectionData,
    };
}

export function disconnectNode(
    parentNode: IAbstractNode,
    childNodeID: string){
        return {
            type: NODE_ACTIONS.DISCONNECT,
            parentNode,
            childNodeID
        }
    }