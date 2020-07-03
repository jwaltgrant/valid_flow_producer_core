import { IPayloadDefinition } from "../../payload/PayloadDefinition";
import { ITestField, ITestResult } from "..";

export enum FlowTestActions {
  INITIALIZE_FROM_PAYLOAD = "ft_init_from_payload",
  ADD_TEST_FIELD = "ft_add_field",
  UPDATE_TEST_FIELD = "ft_update_field",
  ADD_TEST_RESULT = "ft_add_result",
}

export function initializeFromPayloadDef(
  payloadDef: IPayloadDefinition,
  name?: string
) {
  return {
    type: FlowTestActions.INITIALIZE_FROM_PAYLOAD,
    payloadDef,
    name,
  };
}

export function addTestField(newField: ITestField) {
  return {
    type: FlowTestActions.ADD_TEST_FIELD,
    newField,
  };
}

export function updateTestField(newField: ITestField) {
  return {
    type: FlowTestActions.UPDATE_TEST_FIELD,
    newField,
  };
}

export function addTestResult(result: ITestResult) {
  return {
    type: FlowTestActions.ADD_TEST_RESULT,
    result,
  };
}
