import {NODE_ACTIONS} from './actions';
import * as Node from '../AbstractNode';

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
      default:
        return state;
    }
}
