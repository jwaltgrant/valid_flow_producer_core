export var TYPE_ACTIONS;
(function (TYPE_ACTIONS) {
    TYPE_ACTIONS["ADD_TYPE"] = "ta_add";
    TYPE_ACTIONS["REMOVE_TYPE"] = "ta_rm";
})(TYPE_ACTIONS || (TYPE_ACTIONS = {}));
export function addType(newType) {
    return {
        type: TYPE_ACTIONS.ADD_TYPE,
        newType,
    };
}
export function removeType(typeName) {
    return {
        type: TYPE_ACTIONS.REMOVE_TYPE,
        typeName,
    };
}
