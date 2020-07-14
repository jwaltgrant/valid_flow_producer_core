import { IPayloadDefinition } from "../../payload/PayloadDefinition";
import { ITestField, ITestResult } from "..";
export declare enum FlowTestActions {
    INITIALIZE_FROM_PAYLOAD = "ft_init_from_payload",
    ADD_TEST_FIELD = "ft_add_field",
    UPDATE_TEST_FIELD = "ft_update_field",
    ADD_TEST_RESULT = "ft_add_result"
}
export declare function initializeFromPayloadDef(payloadDef: IPayloadDefinition, name?: string): {
    type: FlowTestActions;
    payloadDef: IPayloadDefinition;
    name: string;
};
export declare function addTestField(newField: ITestField): {
    type: FlowTestActions;
    newField: ITestField;
};
export declare function updateTestField(newField: ITestField): {
    type: FlowTestActions;
    newField: ITestField;
};
export declare function addTestResult(result: ITestResult): {
    type: FlowTestActions;
    result: ITestResult;
};
