import * as Bool from "../AbstractNode";

const actions = new Bool.BoolActions();
export const boolAction: Bool.IBooleanAction = {
  falseTargets: [],
  trueTargets: [],
  parentNodeIDs: [],
  block: null,
  id: "1",
};

describe("Bool Actions Tests", () => {
  test("Instance Of", () => {
    const other: { parentNodeIDs: any[]; id: string } = {
      parentNodeIDs: [],
      id: "2",
    };
    expect(actions.instanceOf(other)).toBeFalsy();
    expect(actions.instanceOf(boolAction)).toBeTruthy();
  });

  test("Connect Input", () => {
    expect(
      actions.connectNode({
        fromNode: boolAction,
        toNodeID: "2",
        connectionKey: Bool.BooleanConnectionKey.INPUT,
      })
    ).toEqual({
      falseTargets: [],
      trueTargets: [],
      parentNodeIDs: ["2"],
      block: null,
      id: "1",
    });
  });

  test("Connect False", () => {
    expect(
      actions.connectNode({
        fromNode: boolAction,
        toNodeID: "3",
        connectionKey: Bool.BooleanConnectionKey.FALSE,
      })
    ).toEqual({
      falseTargets: ["3"],
      trueTargets: [],
      parentNodeIDs: ["2"],
      block: null,
      id: "1",
    });
  });
  test("Connect True", () => {
    expect(
      actions.connectNode({
        fromNode: boolAction,
        toNodeID: "4",
        connectionKey: Bool.BooleanConnectionKey.TRUE,
      })
    ).toEqual({
      falseTargets: ["3"],
      trueTargets: ["4"],
      parentNodeIDs: ["2"],
      block: null,
      id: "1",
    });
  });
  test("disconnect Input", () => {
    expect(
      actions.disconnectNode({
        fromNode: boolAction,
        toNodeID: "2",
        connectionKey: Bool.BooleanConnectionKey.INPUT,
      })
    ).toEqual({
      falseTargets: ["3"],
      trueTargets: ["4"],
      parentNodeIDs: [],
      block: null,
      id: "1",
    });
  });

  test("Disconnect False", () => {
    expect(
      actions.disconnectNode({
        fromNode: boolAction,
        toNodeID: "3",
        connectionKey: Bool.BooleanConnectionKey.FALSE,
      })
    ).toEqual({
      falseTargets: [],
      trueTargets: ["4"],
      parentNodeIDs: [],
      block: null,
      id: "1",
    });
  });
  test("Disconnect True", () => {
    expect(
      actions.disconnectNode({
        fromNode: boolAction,
        toNodeID: "4",
        connectionKey: Bool.BooleanConnectionKey.TRUE,
      })
    ).toEqual({
      falseTargets: [],
      trueTargets: [],
      parentNodeIDs: [],
      block: null,
      id: "1",
    });
  });
});
