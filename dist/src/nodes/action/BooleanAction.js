import { initActionNode } from "./ActionNode";
export function initBooleanAction() {
    return Object.assign(Object.assign({}, initActionNode("BOOLEAN")), { falseTargets: [], trueTargets: [] });
}
export var BooleanConnectionKey;
(function (BooleanConnectionKey) {
    BooleanConnectionKey["INPUT"] = "i";
    BooleanConnectionKey["FALSE"] = "f";
    BooleanConnectionKey["TRUE"] = "t";
})(BooleanConnectionKey || (BooleanConnectionKey = {}));
class BoolActions {
    instanceOf(node) {
        return "falseTargets" in node && "trueTargets" in node;
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
            case BooleanConnectionKey.INPUT:
                return node.parentNodeIDs;
            case BooleanConnectionKey.FALSE:
                return node.falseTargets;
            case BooleanConnectionKey.TRUE:
                return node.trueTargets;
        }
    }
}
const actions = new BoolActions();
export default actions;
