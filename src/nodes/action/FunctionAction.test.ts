import * as FuncAction from "./FunctionAction";

const actions = FuncAction.default;
export const funcAction: FuncAction.IFunctionAction = {
  targets: [],
  parentNodeIDs: [],
  id: "1",
};
describe("Test Function Actions", () => {
  test("Instannce Of", () => {
    const other: { parentNodeIDs: any[]; id: string } = {
      parentNodeIDs: [],
      id: "-1",
    };
    expect(actions.instanceOf(other)).toBeFalsy();
    expect(actions.instanceOf(funcAction)).toBeTruthy();
  });
  test("Add Input", () => {
    expect(
      actions.connectNode({
        fromNode: funcAction,
        toNodeID: "2",
        connectionKey: FuncAction.FunctionActionKey.INPUT,
      })
    ).toEqual({
      targets: [],
      parentNodeIDs: ["2"],
      id: "1",
    });
  });
  test("Add Target", () => {
    expect(
      actions.connectNode({
        fromNode: funcAction,
        toNodeID: "3",
        connectionKey: FuncAction.FunctionActionKey.OUTPUT,
      })
    ).toEqual({
      targets: ["3"],
      parentNodeIDs: ["2"],
      id: "1",
    });
  });
  test("Remove Input", () => {
    expect(
      actions.disconnectNode({
        fromNode: funcAction,
        toNodeID: "2",
        connectionKey: FuncAction.FunctionActionKey.INPUT,
      })
    ).toEqual({
      targets: ["3"],
      parentNodeIDs: [],
      id: "1",
    });
  });
  test("Remove Target", () => {
    expect(
      actions.disconnectNode({
        fromNode: funcAction,
        toNodeID: "3",
        connectionKey: FuncAction.FunctionActionKey.OUTPUT,
      })
    ).toEqual({
      targets: [],
      parentNodeIDs: [],
      id: "1",
    });
  });
});
