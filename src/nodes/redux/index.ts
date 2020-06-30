import {NODE_ACTIONS} from './actions';
import * as Node from '../AbstractNode';
import * as Action from '../action/ActionNode';
import outputNodeReducer, { outputMatches } from '../io/redux';
import { IOutputNode } from '../io/OutputNode';

const initialState: Node.IAbstractNode[] = []

export default function nodeStore(state: Node.IAbstractNode[] = initialState, action: any): Node.IAbstractNode[]{
    switch (action.type) {
      case NODE_ACTIONS.ADD_NODE:
        return Node.addNode(state, action.node);
      case NODE_ACTIONS.REMOVE_NODE:
        return Node.removeNode(state, action.nodeID);
      case NODE_ACTIONS.CONNECT:
        return Node.connectNodes(
            state,
            action as Node.IConnect<Node.IAbstractNode>
        );
      case NODE_ACTIONS.DISCONNECT:
        return Node.disconnectNodes(
          state,
          action as Node.IConnect<Node.IAbstractNode>
        );
      case NODE_ACTIONS.SET_BLOCK:
        return Action.updateBlock(
          state,
          action.nodeID,
          action.blockSetKey,
          action.blockDef
        );
      case NODE_ACTIONS.SET_ARG:
        return Action.updateArg(
          state,
          action.nodeID,
          action.argInstance
        )
      case NODE_ACTIONS.SET_RETURN_KEY:
        return Action.setReturnKey(
          state,
          action.nodeID,
          action.returnKey
        );
      default:
        if(outputMatches(action.type)){
          return outputNodeReducer(state as IOutputNode[], action);
        }
        return state;
    }
}
