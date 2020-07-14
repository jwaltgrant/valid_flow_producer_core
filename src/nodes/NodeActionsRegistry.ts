import { INodeActions, IAbstractNode, IConnect } from ".";

import FunctionActions from "./action/FunctionAction";
import BooleanActions from "./action/BooleanAction";

class NodeActionClassRegistry {
  private nodeActionClasses: INodeActions<IAbstractNode>[];

  constructor() {
    this.nodeActionClasses = [];
  }

  public registerNodeActionClass(actionClass: INodeActions<IAbstractNode>) {
    this.nodeActionClasses.push(actionClass);
  }

  public connect(connectData: IConnect<IAbstractNode>) {
    for (const actionClass of this.nodeActionClasses) {
      if (actionClass.instanceOf(connectData.fromNode)) {
        return actionClass.connectNode(connectData);
      }
    }
    throw new Error(`No Action class registered for ${connectData.fromNode}`);
  }
  public disconnect(connectData: IConnect<IAbstractNode>) {
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
