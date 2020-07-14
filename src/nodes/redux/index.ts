import { NODE_ACTIONS } from "./actions";
import { NodeHelpers, ActionNodeHelpers } from "./helpers";
import { IConnect, IAbstractNode } from "../AbstractNode";
import outputNodeReducer, { outputMatches } from "../io/redux";
import { IOutputNode } from "../io/OutputNode";

const initialState: IAbstractNode[] = [];

export default function nodeStore(
  state: IAbstractNode[] = initialState,
  action: any
): IAbstractNode[] {
  switch (action.type) {
    case NODE_ACTIONS.ADD_NODE:
      return NodeHelpers.addNode(state, action.node);
    case NODE_ACTIONS.REMOVE_NODE:
      return NodeHelpers.removeNode(state, action.nodeID);
    case NODE_ACTIONS.CONNECT:
      return NodeHelpers.connectNodes(state, action as IConnect<IAbstractNode>);
    case NODE_ACTIONS.DISCONNECT:
      return NodeHelpers.disconnectNodes(
        state,
        action as IConnect<IAbstractNode>
      );
    case NODE_ACTIONS.SET_BLOCK:
      return ActionNodeHelpers.updateBlock(
        state,
        action.nodeID,
        action.blockSetKey,
        action.blockDef
      );
    case NODE_ACTIONS.SET_ARG:
      return ActionNodeHelpers.updateArg(
        state,
        action.nodeID,
        action.argInstance
      );
    case NODE_ACTIONS.SET_RETURN_KEY:
      return ActionNodeHelpers.setReturnKey(
        state,
        action.nodeID,
        action.returnKey
      );
    default:
      if (outputMatches(action.type)) {
        return outputNodeReducer(state as IOutputNode[], action);
      }
      return state;
  }
}
