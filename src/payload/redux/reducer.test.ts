import reducer, { IPayloadState } from "./";
import * as PayloadActions from "./actions";
import IFieldDef from "../../FieldDef";
import IDynamicKey from "../DynamicKey";

describe("Payload Reducer Tests", () => {
  let state: IPayloadState = {
    payloadItems: [],
    dynamicKeys: [],
    invalidKey: "",
  };
  const pItem1: IFieldDef = { name: "name", type: "any" };
  const pItem2: IFieldDef = { name: "name2", type: "string" };
  const dItem1: IDynamicKey = { name: "dName1", type: "person", nodeID: "1" };
  const dItem2: IDynamicKey = {
    name: "dName2",
    type: "CSV",
    nodeID: "2",
  };
  test("Return Initial State", () => {
    expect(reducer(undefined, {})).toEqual(state);
  });

  test("Add Item", () => {
    state = reducer(state, PayloadActions.addItem(pItem1));
    expect(state).toEqual({
      payloadItems: [pItem1],
      dynamicKeys: [],
      invalidKey: "",
    });
    state = reducer(state, PayloadActions.addItem(pItem2));
    expect(state).toEqual({
      payloadItems: [pItem1, pItem2],
      dynamicKeys: [],
      invalidKey: "",
    });
  });

  test("Remove Item", () => {
    state = reducer(state, PayloadActions.removeItem(pItem1.name));
    expect(state).toEqual({
      payloadItems: [pItem2],
      dynamicKeys: [],
      invalidKey: "",
    });
  });
  test("Add Dynamic Key", () => {
    state = reducer(state, PayloadActions.addDynamicKey(dItem1));
    expect(state).toEqual({
      payloadItems: [pItem2],
      dynamicKeys: [dItem1],
      invalidKey: "",
    });
    state = reducer(state, PayloadActions.addDynamicKey(dItem2));
    expect(state).toEqual({
      payloadItems: [pItem2],
      dynamicKeys: [dItem1, dItem2],
      invalidKey: "",
    });
  });
  test("Remove Dynamic Key", () => {
    state = reducer(state, PayloadActions.removeItem(dItem1.name));
    expect(state).toEqual({
      payloadItems: [pItem2],
      dynamicKeys: [dItem2],
      invalidKey: "",
    });
  });

  test("Invalid Key", () => {
    const item = { name: "name2", type: "any" };
    state = reducer(state, PayloadActions.addItem(item));
    expect(state).toEqual({
      payloadItems: [pItem2],
      dynamicKeys: [dItem2],
      invalidKey: item.name,
    });
  });
});
