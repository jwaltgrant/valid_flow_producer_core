import * as Output from "../OutputNode";
import { OUTPUT_NODE_ACTIONS } from "./actions";
export function outputMatches(actionType) {
    return !!Object.values(OUTPUT_NODE_ACTIONS).find((val) => val === actionType);
}
const initialState = [];
export default function outputNodeReducer(state = initialState, action) {
    let index;
    let node;
    switch (action.type) {
        case OUTPUT_NODE_ACTIONS.ADD_OUTPUT_PAIR:
            index = state.findIndex((node) => node.id === action.nodeID);
            node = Output.addOutputPair(state[index], action.outputPair);
            state.splice(index, 1, node);
            return [...state];
        case OUTPUT_NODE_ACTIONS.REMOVE_OUTPUT_PAIR:
            index = state.findIndex((node) => node.id === action.nodeID);
            node = Output.removeOutputPair(state[index], action.pairKey);
            state.splice(index, 1, node);
            return [...state];
        case OUTPUT_NODE_ACTIONS.UPDATE_OUTPUT_PAIR:
            index = state.findIndex((node) => node.id === action.nodeID);
            node = Output.updateOutPair(state[index], action.outputPair);
            state.splice(index, 1, node);
            return [...state];
    }
    return state;
}
