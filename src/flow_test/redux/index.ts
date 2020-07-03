import { ITestPayload, TestPayload, ITestField, ITestResult } from "..";
import { FlowTestActions } from "./actions";

export interface rState {
    testPayload: ITestPayload;
    testResults: ITestResult[];
}

const initialState: rState = {
    testPayload: null,
    testResults: []
};

export default function testPayloadReducer(state: rState = initialState, action: any): rState{
    let fields: ITestField[];
    switch(action.type){
        case FlowTestActions.INITIALIZE_FROM_PAYLOAD:
            return {
                ...state,
                testPayload: TestPayload.initFromPayloadDef(action.payloadDef, action.name)
            }
        case FlowTestActions.ADD_TEST_FIELD:
            fields = TestPayload.addTestField(state.testPayload.fields, action.newField);
            return {
                ...state,
                testPayload: {
                    ...state.testPayload,
                    fields
                }
            }
        case FlowTestActions.UPDATE_TEST_FIELD:
            fields = TestPayload.updateTestField(state.testPayload.fields, action.newField);
            return {
                ...state,
                testPayload: {
                    ...state.testPayload,
                    fields
                }
            }
        case FlowTestActions.ADD_TEST_RESULT:
            const index = state.testResults.findIndex((r) => r.nodeID === action.result.nodeID);
            if(index === -1){
                return {
                    ...state,
                    testResults: [...state.testResults, action.result]
                }
            }
            state.testResults.splice(index, 1, action.result);
            return {
                ...state,
                testResults: [...state.testResults]
            }
    }
    return state;
}
