import FunctionActions from "./action/FunctionAction";
import BooleanActions from "./action/BooleanAction";
class NodeActionClassRegistry {
    constructor() {
        this.nodeActionClasses = [];
    }
    registerNodeActionClass(actionClass) {
        this.nodeActionClasses.push(actionClass);
    }
    connect(connectData) {
        for (const actionClass of this.nodeActionClasses) {
            if (actionClass.instanceOf(connectData.fromNode)) {
                return actionClass.connectNode(connectData);
            }
        }
        throw new Error(`No Action class registered for ${connectData.fromNode}`);
    }
    disconnect(connectData) {
        for (const actionClass of this.nodeActionClasses) {
            if (actionClass.instanceOf(connectData.fromNode)) {
                return actionClass.disconnectNode(connectData);
            }
        }
        throw new Error(`No Action class registered for ${connectData.fromNode}`);
    }
}
const NodeActionRegistry = new NodeActionClassRegistry();
NodeActionRegistry.registerNodeActionClass(FunctionActions);
NodeActionRegistry.registerNodeActionClass(BooleanActions);
export default NodeActionRegistry;
