import NodeActionRegistry from "../NodeActionsRegistry";
import { updateArg, fromBlockDef, } from "../blockInstance/BlockInstance";
/**
 * Collection of Static Functions used by the NodeStore Reducer
 */
export class NodeHelpers {
    /**
     * Add a node to the state, ensuring no duplication of ID
     * @param state List of IAbstractNodes
     * @param node Node to add
     */
    static addNode(state, node) {
        const _node = state.find((n) => n.id === node.id);
        if (_node) {
            throw new Error(`Node ID: ${node.id} is taken`);
        }
        state.push(node);
        return [...state];
    }
    /**
     * Remove a node with provided ID from a list of nodes
     * @param state List of Nodes
     * @param nodeID ID of a node to remove
     */
    static removeNode(state, nodeID) {
        const node = state.find((n) => n.id === nodeID);
        if (!node) {
            return state;
        }
        const index = state.indexOf(node);
        state.splice(index, 1);
        return [...state];
    }
    /**
     * Find a node and up date connections
     * @param state List of Nodes
     * @param connectData IConnect with all needed (dis)connnection data
     * @param connect If the nodes should be connected (true) or disconnected
     */
    static findAndCD(state, connectData, connect) {
        const index = state.findIndex((n) => n.id === connectData.fromNode.id);
        if (index === -1) {
            return { state, updated: false };
        }
        const connectedNode = connect
            ? NodeActionRegistry.connect(connectData)
            : NodeActionRegistry.disconnect(connectData);
        state.splice(index, 1, connectedNode);
        return { state, updated: true };
    }
    /**
     * Connect two nodes
     * @param state List of Nodes
     * @param conenctData Object containing all connection data
     */
    static connectNodes(state, conenctData) {
        const _do = NodeHelpers.findAndCD(state, conenctData, true);
        if (_do.updated) {
            return [..._do.state];
        }
        return state;
    }
    /**
     * Disconnect two nodes
     * @param state List of Nodes
     * @param conenctData Object containing all disconnection data
     */
    static disconnectNodes(state, conenctData) {
        const _do = NodeHelpers.findAndCD(state, conenctData, false);
        if (_do.updated) {
            return [..._do.state];
        }
        return state;
    }
}
export class ActionNodeHelpers {
    static findActionNode(state, nodeID) {
        const node = state.find((n) => n.id === nodeID);
        if (!node || !("block" in node)) {
            return null;
        }
        return node;
    }
    static updateBlock(state, nodeID, blockSetKey, blockDef) {
        const node = state.find((n) => n.id === nodeID);
        if (!node || !("block" in node)) {
            return state;
        }
        const index = state.indexOf(node);
        const block = fromBlockDef({
            blockSetKey,
            blockDef,
            block: node.block,
        });
        const _node = Object.assign(Object.assign({}, node), { block });
        state.splice(index, 1, _node);
        return [...state];
    }
    static updateArg(state, nodeID, argInstance) {
        const node = ActionNodeHelpers.findActionNode(state, nodeID);
        if (!node) {
            return state;
        }
        const index = state.indexOf(node);
        const _node = Object.assign(Object.assign({}, node), { block: updateArg(node.block, argInstance) });
        state.splice(index, 1, _node);
        return [...state];
    }
    static setReturnKey(state, nodeID, returnKey) {
        const node = ActionNodeHelpers.findActionNode(state, nodeID);
        if (!node) {
            return state;
        }
        const index = state.indexOf(node);
        const _node = Object.assign(Object.assign({}, node), { returnKey });
        state.splice(index, 1, _node);
        return [...state];
    }
}
