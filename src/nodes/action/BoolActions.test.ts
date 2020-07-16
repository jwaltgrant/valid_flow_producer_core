import * as Bool from "./BooleanAction";

const actions = Bool.default;
export const boolAction: Bool.IBooleanAction = {
  type: "BOOL",
  falseTargets: [],
  trueTargets: [],
  parentNodeIDs: [],
  block: {
    args: [
      {
        name: "arg1",
        value: "1",
        payloadElement: false,
      },
    ],
    blockKey: "test",
    blockSetKey: "test",
  },
  id: "1",
};

describe("Bool Actions Tests", () => {
  test("Instance Of", () => {
    const other: { type: ""; parentNodeIDs: any[]; id: string } = {
      type: "",
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
      block: {
        args: [
          {
            name: "arg1",
            value: "1",
            payloadElement: false,
          },
        ],
        blockKey: "test",
        blockSetKey: "test",
      },
      id: "1",
      type: "BOOL",
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
      block: {
        args: [
          {
            name: "arg1",
            value: "1",
            payloadElement: false,
          },
        ],
        blockKey: "test",
        blockSetKey: "test",
      },
      id: "1",
      type: "BOOL",
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
      block: {
        args: [
          {
            name: "arg1",
            value: "1",
            payloadElement: false,
          },
        ],
        blockKey: "test",
        blockSetKey: "test",
      },
      id: "1",
      type: "BOOL",
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
      block: {
        args: [
          {
            name: "arg1",
            value: "1",
            payloadElement: false,
          },
        ],
        blockKey: "test",
        blockSetKey: "test",
      },
      id: "1",
      type: "BOOL",
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
      block: {
        args: [
          {
            name: "arg1",
            value: "1",
            payloadElement: false,
          },
        ],
        blockKey: "test",
        blockSetKey: "test",
      },
      id: "1",
      type: "BOOL",
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
      block: {
        args: [
          {
            name: "arg1",
            value: "1",
            payloadElement: false,
          },
        ],
        blockKey: "test",
        blockSetKey: "test",
      },
      id: "1",
      type: "BOOL",
    });
  });
});
