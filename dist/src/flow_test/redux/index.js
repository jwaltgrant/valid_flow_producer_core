import { TestPayload } from "..";
import { FlowTestActions } from "./actions";
const initialState = {
    testPayload: null,
    testResults: [],
};
export default function testPayloadReducer(state = initialState, action) {
    let fields;
    switch (action.type) {
        case FlowTestActions.INITIALIZE_FROM_PAYLOAD:
            return Object.assign(Object.assign({}, state), { testPayload: TestPayload.initFromPayloadDef(action.payloadDef, action.name) });
        case FlowTestActions.ADD_TEST_FIELD:
            fields = TestPayload.addTestField(state.testPayload.fields, action.newField);
            return Object.assign(Object.assign({}, state), { testPayload: Object.assign(Object.assign({}, state.testPayload), { fields }) });
        case FlowTestActions.UPDATE_TEST_FIELD:
            fields = TestPayload.updateTestField(state.testPayload.fields, action.newField);
            return Object.assign(Object.assign({}, state), { testPayload: Object.assign(Object.assign({}, state.testPayload), { fields }) });
        case FlowTestActions.ADD_TEST_RESULT:
            const index = state.testResults.findIndex((r) => r.nodeID === action.result.nodeID);
            if (index === -1) {
                return Object.assign(Object.assign({}, state), { testResults: [...state.testResults, action.result] });
            }
            state.testResults.splice(index, 1, action.result);
            return Object.assign(Object.assign({}, state), { testResults: [...state.testResults] });
    }
    return state;
}
