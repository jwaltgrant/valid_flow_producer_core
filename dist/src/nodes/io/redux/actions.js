export var OUTPUT_NODE_ACTIONS;
(function (OUTPUT_NODE_ACTIONS) {
    OUTPUT_NODE_ACTIONS["ADD_OUTPUT_PAIR"] = "add_ouput_pair";
    OUTPUT_NODE_ACTIONS["REMOVE_OUTPUT_PAIR"] = "remove_output_pair";
    OUTPUT_NODE_ACTIONS["UPDATE_OUTPUT_PAIR"] = "update_output_pair";
})(OUTPUT_NODE_ACTIONS || (OUTPUT_NODE_ACTIONS = {}));
export function addOutputPair(nodeID, outputPair) {
    return {
        type: OUTPUT_NODE_ACTIONS.ADD_OUTPUT_PAIR,
        nodeID,
        outputPair,
    };
}
export function removeOutputPair(nodeID, pairKey) {
    return {
        type: OUTPUT_NODE_ACTIONS.REMOVE_OUTPUT_PAIR,
        nodeID,
        pairKey,
    };
}
export function updateOutputPair(nodeID, outputPair) {
    return {
        type: OUTPUT_NODE_ACTIONS.UPDATE_OUTPUT_PAIR,
        nodeID,
        outputPair,
    };
}
