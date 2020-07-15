import { IPayloadDefinition } from "../../payload/PayloadDefinition";
import * as Actions from "./actions";
import { ITestPayload, ITestField, ITestResult } from "..";
import reducer, { IFlowTestState } from ".";

const payloadDef: IPayloadDefinition = {
  payloadItems: [
    {
      name: "field1",
      type: "string",
    },
    {
      name: "field2",
      type: "number",
    },
    {
      name: "field3",
      type: "any",
    },
  ],
};

describe("Flow Test Reducer Tests", () => {
  let state: IFlowTestState = undefined;
  test("Initial State", () => {
    expect(reducer(undefined, {})).toEqual({
      testPayload: null,
      testResults: [],
    });
  });
  test("Initialize from Payload", () => {
    state = reducer(
      state,
      Actions.initializeFromPayloadDef(payloadDef, "test1")
    );
    expect(state.testPayload.name).toEqual("test1");
    expect(state.testPayload.fields.length).toEqual(
      payloadDef.payloadItems.length
    );
    state.testPayload.fields.forEach((field) => {
      const item = payloadDef.payloadItems.find((i) => i.name === field.name);
      expect(item).not.toBeNull();
      expect(item.type).toEqual(field.type);
    });
  });
  test("Updating Test Field", () => {
    const field = { ...state.testPayload.fields[0] };
    field.testVal = "SOME_VAL";
    expect(state.testPayload.fields[0]).not.toEqual(field);
    state = reducer(state, Actions.updateTestField(field));
    expect(state.testPayload.fields[0]).toEqual(field);
  });
  test("Add Test Field", () => {
    const newField: ITestField = {
      name: "field4",
      type: "number",
      testVal: 4,
    };
    const length = state.testPayload.fields.length;
    state = reducer(state, Actions.addTestField(newField));
    expect(state.testPayload.fields.length).toEqual(length + 1);
    expect(state.testPayload.fields[length]).toEqual(newField);
  });
  test("Add Test Result", () => {
    const testResult: ITestResult = {
      nodeID: "1",
      result: false,
    };
    expect(state.testResults.length).toEqual(0);
    state = reducer(state, Actions.addTestResult(testResult));
    expect(state.testResults.length).toEqual(1);
    expect(state.testResults[0]).toEqual(testResult);
  });
});
