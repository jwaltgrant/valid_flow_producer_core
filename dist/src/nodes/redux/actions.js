export var NODE_ACTIONS;
(function (NODE_ACTIONS) {
    NODE_ACTIONS["CONNECT"] = "na_connect";
    NODE_ACTIONS["DISCONNECT"] = "na_disconnect";
    NODE_ACTIONS["ADD_NODE"] = "na_add_node";
    NODE_ACTIONS["REMOVE_NODE"] = "na_rm_node";
    NODE_ACTIONS["SET_BLOCK"] = "na_set_block";
    NODE_ACTIONS["SET_ARG"] = "na_set_arg";
    NODE_ACTIONS["SET_RETURN_KEY"] = "na_set_ret_key";
})(NODE_ACTIONS || (NODE_ACTIONS = {}));
export function connectNode(connectionData) {
    return Object.assign({ type: NODE_ACTIONS.CONNECT }, connectionData);
}
export function disconnectNode(connectionData) {
    return Object.assign({ type: NODE_ACTIONS.DISCONNECT }, connectionData);
}
export function addNode(node) {
    return {
        type: NODE_ACTIONS.ADD_NODE,
        node,
    };
}
export function removeNode(nodeID) {
    return {
        type: NODE_ACTIONS.REMOVE_NODE,
        nodeID,
    };
}
export function setBlock(nodeID, blockSetKey, blockDef) {
    return {
        type: NODE_ACTIONS.SET_BLOCK,
        nodeID,
        blockSetKey,
        blockDef,
    };
}
export function setArg(nodeID, argInstance) {
    return {
        type: NODE_ACTIONS.SET_ARG,
        nodeID,
        argInstance,
    };
}
export function setReturnKey(nodeID, returnKey) {
    return {
        type: NODE_ACTIONS.SET_RETURN_KEY,
        nodeID,
        returnKey,
    };
}
