import outputNodeReducer from ".";
import * as Actions from "./actions";
import { initOutputNode } from "../OutputNode";
const node1 = initOutputNode("1");
const node2 = initOutputNode("2");
const nodes = [node1, node2];
const pair = {
    key: "key1",
    payloadElement: true,
    payloadKey: "item1",
};
const pair2 = {
    key: "key2",
    payloadElement: false,
    literalDef: {
        type: "string",
        value: "Hello World",
    },
};
const pair3 = {
    key: "key3",
    payloadElement: false,
    literalDef: {
        type: "number",
        value: 6,
    },
};
describe("Output Node Reducer Tests", () => {
    let state = [];
    test("Initial State", () => {
        expect(outputNodeReducer(undefined, {})).toEqual(state);
    });
    test("Add Output Pair", () => {
        state = [Object.assign({}, node1), Object.assign({}, node2)]; //Nodes are added via the parent reducer, simulate adding here
        state = outputNodeReducer(state, Actions.addOutputPair(node1.id, pair));
        nodes[0].outputPairs.push(pair);
        expect(state).toEqual(nodes);
        state = outputNodeReducer(state, Actions.addOutputPair(node2.id, pair2));
        state = outputNodeReducer(state, Actions.addOutputPair(node2.id, pair3));
        nodes[1].outputPairs.push(Object.assign({}, pair2));
        nodes[1].outputPairs.push(Object.assign({}, pair3));
        expect(state).toEqual(nodes);
    });
    test("Update Output Pair", () => {
        const updatedPair = Object.assign(Object.assign({}, pair3), { payloadElement: true, payloadKey: "item2" });
        state = outputNodeReducer(state, Actions.updateOutputPair(node2.id, updatedPair));
        nodes[1].outputPairs.splice(1, 1, Object.assign({}, updatedPair));
        expect(state).toEqual(nodes);
    });
    test("Remove Output Pair", () => {
        const keyToRemove = pair2.key;
        state = outputNodeReducer(state, Actions.removeOutputPair(node2.id, keyToRemove));
        nodes[1].outputPairs.splice(0, 1);
        expect(state).toEqual(nodes);
    });
});
