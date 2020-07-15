export var BLOCK_SET_ACTIONS;
(function (BLOCK_SET_ACTIONS) {
    BLOCK_SET_ACTIONS["RECIEVE_BLOCK_SET"] = "rc_block_set";
    BLOCK_SET_ACTIONS["REMOVE_BLOCK_SET"] = "rm_block_set";
})(BLOCK_SET_ACTIONS || (BLOCK_SET_ACTIONS = {}));
export function recieveBlockSet(blockSet) {
    return {
        type: BLOCK_SET_ACTIONS.RECIEVE_BLOCK_SET,
        blockSet,
    };
}
export function removeBlockSet(blockSetKey) {
    return {
        type: BLOCK_SET_ACTIONS.REMOVE_BLOCK_SET,
        blockSetKey,
    };
}
