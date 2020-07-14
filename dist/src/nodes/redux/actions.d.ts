import { IAbstractNode, IConnect } from "../AbstractNode";
import { IArgInstance } from "../blockInstance/BlockInstance";
import { IBlockDef } from "../blockInstance/IBlockSet";
export declare enum NODE_ACTIONS {
    CONNECT = "na_connect",
    DISCONNECT = "na_disconnect",
    ADD_NODE = "na_add_node",
    REMOVE_NODE = "na_rm_node",
    SET_BLOCK = "na_set_block",
    SET_ARG = "na_set_arg",
    SET_RETURN_KEY = "na_set_ret_key"
}
export declare function connectNode(connectionData: IConnect<IAbstractNode>): {
    fromNode: IAbstractNode;
    toNodeID: string;
    connectionKey: string;
    type: NODE_ACTIONS;
};
export declare function disconnectNode(connectionData: IConnect<IAbstractNode>): {
    fromNode: IAbstractNode;
    toNodeID: string;
    connectionKey: string;
    type: NODE_ACTIONS;
};
export declare function addNode(node: IAbstractNode): {
    type: NODE_ACTIONS;
    node: IAbstractNode;
};
export declare function removeNode(nodeID: string): {
    type: NODE_ACTIONS;
    nodeID: string;
};
export declare function setBlock(nodeID: string, blockSetKey: string, blockDef: IBlockDef): {
    type: NODE_ACTIONS;
    nodeID: string;
    blockSetKey: string;
    blockDef: IBlockDef;
};
export declare function setArg(nodeID: string, argInstance: IArgInstance): {
    type: NODE_ACTIONS;
    nodeID: string;
    argInstance: IArgInstance;
};
export declare function setReturnKey(nodeID: string, returnKey: string | null): {
    type: NODE_ACTIONS;
    nodeID: string;
    returnKey: string;
};
