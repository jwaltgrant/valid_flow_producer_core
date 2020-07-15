import { IAbstractNode, getAncenstorNodeIDs, IChildNode } from "./AbstractNode";
import * as Node from "./AbstractNode";
import * as Func from "./action/FunctionAction";
import * as Bool from "./action/BooleanAction";
import NodeActionRegistry from "./NodeActionsRegistry";

export const inputNode: IAbstractNode = {
  type: "INPUT",
  id: "1",
};

export const childNodes: IChildNode[] = [
  {
    type: "",
    id: "2",
    parentNodeIDs: ["1"],
  },
  {
    type: "",
    id: "3",
    parentNodeIDs: ["1"],
  },
  {
    type: "",
    id: "4",
    parentNodeIDs: ["2"],
  },
  {
    type: "",
    id: "5",
    parentNodeIDs: ["4"],
  },
];

export const allNodes = [inputNode, ...childNodes];

test("Ancenstors are 1, 2, and 4", () => {
  const ancenstors = getAncenstorNodeIDs(childNodes[3], allNodes);
  expect(ancenstors).toEqual(["4", "2", "1"]);
});
const boolAction: Bool.IBooleanAction = {
  type: "BOOL",
  falseTargets: [],
  trueTargets: [],
  parentNodeIDs: [],
  block: null,
  id: "1",
};

const funcAction: Func.IFunctionAction = {
  type: "FUNC",
  targets: [],
  parentNodeIDs: [],
  block: null,
  id: "2",
};

describe("Node Action Registry Tests", () => {
  const actions = NodeActionRegistry;
  test("Add/Remove Bool from registry", () => {
    expect(
      actions.connect({
        fromNode: boolAction,
        toNodeID: "3",
        connectionKey: Bool.BooleanConnectionKey.INPUT,
      })
    ).toEqual({
      falseTargets: [],
      trueTargets: [],
      parentNodeIDs: ["3"],
      block: null,
      id: "1",
    });
    expect(
      actions.connect({
        fromNode: boolAction,
        toNodeID: "4",
        connectionKey: Bool.BooleanConnectionKey.FALSE,
      })
    ).toEqual({
      falseTargets: ["4"],
      trueTargets: [],
      parentNodeIDs: ["3"],
      block: null,
      id: "1",
    });
    expect(
      actions.connect({
        fromNode: boolAction,
        toNodeID: "5",
        connectionKey: Bool.BooleanConnectionKey.TRUE,
      })
    ).toEqual({
      falseTargets: ["4"],
      trueTargets: ["5"],
      parentNodeIDs: ["3"],
      block: null,
      id: "1",
    });
    expect(
      actions.disconnect({
        fromNode: boolAction,
        toNodeID: "3",
        connectionKey: Bool.BooleanConnectionKey.INPUT,
      })
    ).toEqual({
      falseTargets: ["4"],
      trueTargets: ["5"],
      parentNodeIDs: [],
      block: null,
      id: "1",
    });
    expect(
      actions.disconnect({
        fromNode: boolAction,
        toNodeID: "4",
        connectionKey: Bool.BooleanConnectionKey.FALSE,
      })
    ).toEqual({
      falseTargets: [],
      trueTargets: ["5"],
      parentNodeIDs: [],
      block: null,
      id: "1",
    });
    expect(
      actions.disconnect({
        fromNode: boolAction,
        toNodeID: "5",
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
  test("Add/Remove Func from registry", () => {
    expect(
      actions.connect({
        fromNode: funcAction,
        toNodeID: "3",
        connectionKey: Func.FunctionActionKey.INPUT,
      })
    ).toEqual({
      parentNodeIDs: ["3"],
      targets: [],
      block: null,
      id: "2",
    });
    expect(
      actions.connect({
        fromNode: funcAction,
        toNodeID: "4",
        connectionKey: Func.FunctionActionKey.OUTPUT,
      })
    ).toEqual({
      parentNodeIDs: ["3"],
      targets: ["4"],
      block: null,
      id: "2",
    });
    expect(
      actions.disconnect({
        fromNode: funcAction,
        toNodeID: "3",
        connectionKey: Func.FunctionActionKey.INPUT,
      })
    ).toEqual({
      parentNodeIDs: [],
      targets: ["4"],
      block: null,
      id: "2",
    });
    expect(
      actions.disconnect({
        fromNode: funcAction,
        toNodeID: "4",
        connectionKey: Func.FunctionActionKey.OUTPUT,
      })
    ).toEqual({
      parentNodeIDs: [],
      targets: [],
      block: null,
      id: "2",
    });
  });
});
