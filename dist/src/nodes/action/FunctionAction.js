import { initActionNode } from "./ActionNode";
export function initFunctionAction() {
    return Object.assign(Object.assign({}, initActionNode("FUNC")), { targets: [] });
}
export var FunctionActionKey;
(function (FunctionActionKey) {
    FunctionActionKey["INPUT"] = "input";
    FunctionActionKey["OUTPUT"] = "output";
})(FunctionActionKey || (FunctionActionKey = {}));
class FunctionActions {
    instanceOf(node) {
        return "targets" in node;
    }
    connectNode(connectionData) {
        const connections = this.getConnectionList(connectionData.fromNode, connectionData.connectionKey);
        if (connections && !connections.includes(connectionData.toNodeID)) {
            connections.push(connectionData.toNodeID);
        }
        return Object.assign({}, connectionData.fromNode);
    }
    disconnectNode(connectionData) {
        const connections = this.getConnectionList(connectionData.fromNode, connectionData.connectionKey);
        const index = connections.indexOf(connectionData.toNodeID);
        if (index > -1) {
            connections.splice(index, 1);
        }
        return Object.assign({}, connectionData.fromNode);
    }
    getConnectionList(node, connectionKey) {
        switch (connectionKey) {
            case FunctionActionKey.INPUT:
                return node.parentNodeIDs;
            case FunctionActionKey.OUTPUT:
                return node.targets;
        }
    }
}
const actions = new FunctionActions();
export default actions;
