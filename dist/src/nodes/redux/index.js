import { NODE_ACTIONS } from "./actions";
import { NodeHelpers, ActionNodeHelpers } from "./helpers";
import outputNodeReducer, { outputMatches } from "../io/redux";
const initialState = [];
export default function nodeStore(state = initialState, action) {
    switch (action.type) {
        case NODE_ACTIONS.ADD_NODE:
            return NodeHelpers.addNode(state, action.node);
        case NODE_ACTIONS.REMOVE_NODE:
            return NodeHelpers.removeNode(state, action.nodeID);
        case NODE_ACTIONS.CONNECT:
            return NodeHelpers.connectNodes(state, action);
        case NODE_ACTIONS.DISCONNECT:
            return NodeHelpers.disconnectNodes(state, action);
        case NODE_ACTIONS.SET_BLOCK:
            return ActionNodeHelpers.updateBlock(state, action.nodeID, action.blockSetKey, action.blockDef);
        case NODE_ACTIONS.SET_ARG:
            return ActionNodeHelpers.updateArg(state, action.nodeID, action.argInstance);
        case NODE_ACTIONS.SET_RETURN_KEY:
            return ActionNodeHelpers.setReturnKey(state, action.nodeID, action.returnKey);
        default:
            if (outputMatches(action.type)) {
                return outputNodeReducer(state, action);
            }
            return state;
    }
}
