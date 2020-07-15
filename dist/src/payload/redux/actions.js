export var PAYLOAD_ACTIONS;
(function (PAYLOAD_ACTIONS) {
    PAYLOAD_ACTIONS["ADD_ITEM"] = "add_item";
    PAYLOAD_ACTIONS["REMOVE_ITEM"] = "rm_item";
    PAYLOAD_ACTIONS["REPLACE_ITEM"] = "rep_item";
    PAYLOAD_ACTIONS["ADD_DYANMIC_KEY"] = "add_d_key";
    PAYLOAD_ACTIONS["REMOVE_DYNAMIC_KEY"] = "rm_d_key";
    PAYLOAD_ACTIONS["CHANGE_KEY"] = "ch_key";
    PAYLOAD_ACTIONS["CHANGE_TYPE"] = "ch_type";
    PAYLOAD_ACTIONS["CLEAR"] = "cl";
})(PAYLOAD_ACTIONS || (PAYLOAD_ACTIONS = {}));
export function addItem(item) {
    return {
        type: PAYLOAD_ACTIONS.ADD_ITEM,
        item,
    };
}
export function removeItem(name) {
    return {
        type: PAYLOAD_ACTIONS.REMOVE_ITEM,
        name,
    };
}
export function replaceItem(oldName, newItem) {
    return {
        type: PAYLOAD_ACTIONS.REPLACE_ITEM,
        oldName,
        newItem,
    };
}
export function changeKey(oldKey, newKey) {
    return {
        type: PAYLOAD_ACTIONS.CHANGE_KEY,
        oldKey,
        newKey,
    };
}
export function changeType(name, newType) {
    return {
        type: PAYLOAD_ACTIONS.CHANGE_TYPE,
        name,
        newType,
    };
}
export function clear() {
    return {
        type: PAYLOAD_ACTIONS.CLEAR,
    };
}
