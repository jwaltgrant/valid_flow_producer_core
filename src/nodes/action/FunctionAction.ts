import { IActionNode, initActionNode } from "./ActionNode";
import { INodeActions, IAbstractNode, IConnect } from "../AbstractNode";

export interface IFunctionAction extends IActionNode {
  targets: string[];
}

export const FUNC_TYPE = 'FUNC';

export function initFunctionAction(): IFunctionAction {
  return {
    ...initActionNode(FUNC_TYPE),
    targets: [],
  };
}

export enum FunctionActionKey {
  INPUT = "input",
  OUTPUT = "output",
}

class FunctionActions implements INodeActions<IFunctionAction> {
  public instanceOf(node: IAbstractNode): boolean {
    return node.type === FUNC_TYPE;
  }
  public connectNode(
    connectionData: IConnect<IFunctionAction>
  ): IFunctionAction {
    const connections = this.getConnectionList(
      connectionData.fromNode,
      connectionData.connectionKey
    );
    if (connections && !connections.includes(connectionData.toNodeID)) {
      connections.push(connectionData.toNodeID);
    }
    return { ...connectionData.fromNode };
  }

  public disconnectNode(
    connectionData: IConnect<IFunctionAction>
  ): IFunctionAction {
    const connections = this.getConnectionList(
      connectionData.fromNode,
      connectionData.connectionKey
    );
    const index = connections.indexOf(connectionData.toNodeID);
    if (index > -1) {
      connections.splice(index, 1);
    }
    return { ...connectionData.fromNode };
  }

  private getConnectionList(
    node: IFunctionAction,
    connectionKey: string
  ): string[] {
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
