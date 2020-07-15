export var FlowTestActions;
(function (FlowTestActions) {
    FlowTestActions["INITIALIZE_FROM_PAYLOAD"] = "ft_init_from_payload";
    FlowTestActions["ADD_TEST_FIELD"] = "ft_add_field";
    FlowTestActions["UPDATE_TEST_FIELD"] = "ft_update_field";
    FlowTestActions["ADD_TEST_RESULT"] = "ft_add_result";
})(FlowTestActions || (FlowTestActions = {}));
export function initializeFromPayloadDef(payloadDef, name) {
    return {
        type: FlowTestActions.INITIALIZE_FROM_PAYLOAD,
        payloadDef,
        name,
    };
}
export function addTestField(newField) {
    return {
        type: FlowTestActions.ADD_TEST_FIELD,
        newField,
    };
}
export function updateTestField(newField) {
    return {
        type: FlowTestActions.UPDATE_TEST_FIELD,
        newField,
    };
}
export function addTestResult(result) {
    return {
        type: FlowTestActions.ADD_TEST_RESULT,
        result,
    };
}
