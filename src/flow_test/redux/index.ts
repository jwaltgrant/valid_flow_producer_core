import { ITestPayload, TestPayload, ITestField } from "..";
import { FlowTestActions } from "./actions";

const initialState: ITestPayload = null;

export default function testPayloadReducer(state: ITestPayload = initialState, action: any): ITestPayload{
    let fields: ITestField[];
    switch(action.type){
        case FlowTestActions.INITIALIZE_FROM_PAYLOAD:
            return TestPayload.initFromPayloadDef(action.payloadDef, action.name);
        case FlowTestActions.ADD_TEST_FIELD:
            fields = TestPayload.addTestField(state.fields, action.newField);
            return {
                ...state,
                fields
            }
        case FlowTestActions.UPDATE_TEST_FIELD:
            fields = TestPayload.updateTestField(state.fields, action.newField);
            return {
                ...state,
                fields
            }
    }
    return state;
}
