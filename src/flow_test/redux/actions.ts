import { IPayloadDefinition } from "../../payload/PayloadDefinition";
import { ITestField } from "..";

export enum FlowTestActions {
    INITIALIZE_FROM_PAYLOAD = 'ft_init_from_payload',
    ADD_TEST_FIELD = 'ft_add_field',
    UPDATE_TEST_FIELD = 'ft_update_field'
}

export function initializeFromPayloadDef(payloadDef: IPayloadDefinition, name?: string){
    return {
        type: FlowTestActions.INITIALIZE_FROM_PAYLOAD,
        payloadDef,
        name
    };
}

export function addTestField(newField: ITestField){
    return {
        type: FlowTestActions.ADD_TEST_FIELD,
        newField
    }
}

export function updateTestField(newField: ITestField){
    return {
        type: FlowTestActions.UPDATE_TEST_FIELD,
        newField
    }
}
