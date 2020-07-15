import nodeReducer from ".";
import * as Actions from "./actions";
import { boolAction } from "../action/BoolActions.test";
import { funcAction as _funcAction } from "../action/FunctionAction.test";
import { FunctionActionKey } from "../action/FunctionAction";
import { BooleanConnectionKey } from "../action/BooleanAction";
const funcAction = Object.assign(Object.assign({}, _funcAction), { id: "function_actiosn" });
describe("Node Reducer Tests", () => {
    let state = [];
    test("Initial State", () => {
        expect(nodeReducer(undefined, {})).toEqual(state);
    });
    test("Add Node", () => {
        state = nodeReducer(state, Actions.addNode(boolAction));
        expect(state).toEqual([boolAction]);
        state = nodeReducer(state, Actions.addNode(funcAction));
        expect(state).toEqual([boolAction, funcAction]);
        expect(() => {
            nodeReducer(state, Actions.addNode({ id: "1" }));
        }).toThrow();
        expect(state).toEqual([boolAction, funcAction]);
    });
    test("Remove Node", () => {
        state = nodeReducer(state, Actions.removeNode("3"));
        expect(state).toEqual([boolAction, funcAction]);
        state = nodeReducer(state, Actions.removeNode(boolAction.id));
        expect(state).toEqual([funcAction]);
        state = nodeReducer(state, Actions.removeNode(funcAction.id));
        expect(state).toEqual([]);
    });
    test("Connect and Disconnect", () => {
        state = nodeReducer(state, Actions.addNode(boolAction));
        state = nodeReducer(state, Actions.addNode(funcAction));
        let connectedBool = Object.assign(Object.assign({}, boolAction), { falseTargets: [funcAction.id] });
        let connectedFunc = Object.assign(Object.assign({}, funcAction), { parentNodeIDs: [boolAction.id] });
        state = nodeReducer(state, Actions.connectNode({
            fromNode: Object.assign({}, boolAction),
            toNodeID: funcAction.id,
            connectionKey: BooleanConnectionKey.FALSE,
        }));
        expect(state).toEqual([connectedBool, funcAction]);
        state = nodeReducer(state, Actions.connectNode({
            fromNode: Object.assign({}, funcAction),
            toNodeID: connectedBool.id,
            connectionKey: FunctionActionKey.INPUT,
        }));
        expect(state).toEqual([connectedBool, connectedFunc]);
        state = nodeReducer(state, Actions.disconnectNode({
            fromNode: connectedBool,
            toNodeID: connectedFunc.id,
            connectionKey: BooleanConnectionKey.FALSE,
        }));
        expect(state).toEqual([Object.assign(Object.assign({}, boolAction), { falseTargets: [] }), connectedFunc]);
        state = nodeReducer(state, Actions.disconnectNode({
            fromNode: connectedFunc,
            toNodeID: boolAction.id,
            connectionKey: FunctionActionKey.INPUT,
        }));
        expect(state).toEqual([
            Object.assign(Object.assign({}, boolAction), { falseTargets: [] }),
            Object.assign(Object.assign({}, connectedFunc), { parentNodeIDs: [] }),
        ]);
    });
    test("Test Set Block and Update Args", () => {
        const blockDef1 = {
            blockKey: "testKey",
            uiString: "test1",
            args: [
                {
                    name: "arg1",
                    type: "string",
                    default: "Hello",
                },
                {
                    name: "arg2",
                    type: "number",
                    default: 7,
                },
            ],
            returnType: "number",
        };
        const expectedBlock = {
            falseTargets: [],
            trueTargets: [],
            parentNodeIDs: [],
            block: {
                blockSetKey: "Test",
                blockKey: "testKey",
                args: [
                    { name: "arg1", value: "Hello", payloadElement: false },
                    { name: "arg2", value: 7, payloadElement: false },
                ],
            },
            id: "1",
        };
        state = nodeReducer(state, Actions.setBlock(boolAction.id, "Test", blockDef1));
        expect(state[0]).toEqual(expectedBlock);
        const newArg = {
            name: "arg1",
            value: "newValue",
            payloadElement: true,
        };
        expectedBlock.block.args.splice(0, 1, newArg);
        state = nodeReducer(state, Actions.setArg(boolAction.id, newArg));
        expect(state[0]).toEqual(expectedBlock);
    });
    test("Test Set Return Key", () => {
        const testKey = "testKey";
        state = nodeReducer(state, Actions.setReturnKey(boolAction.id, testKey));
        expect(state[0].returnKey).toEqual(testKey);
    });
});
