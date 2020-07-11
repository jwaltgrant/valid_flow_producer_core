import FunctionActions from "./action/FunctionAction";
import { IActionNode, initActionNode } from "./action/ActionNode";
import { InputNodeActions } from "./io/InputNode";
import { OutputNodeActions } from "./io/OutputNode";

export interface IBooleanAction extends IActionNode {
  falseTargets: string[];
  trueTargets: string[];
}

export const BOOL_TYPE = 'BOOLEAN';

export function initBooleanAction(): IBooleanAction {
  return {
    ...initActionNode(BOOL_TYPE),
    falseTargets: [],
    trueTargets: [],
  };
}

export enum BooleanConnectionKey {
  INPUT = "i",
  FALSE = "f",
  TRUE = "t",
}

export class BoolActions implements INodeActions<IBooleanAction> {
  public instanceOf(node: IAbstractNode): boolean {
    return node.type === BOOL_TYPE;
  }
  public connectNode(connectionData: IConnect<IBooleanAction>): IBooleanAction {
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
    connectionData: IConnect<IBooleanAction>
  ): IBooleanAction {
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
    node: IBooleanAction,
    connectionKey: string
  ): string[] {
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

export class NodeActionClassRegistry {
  private nodeActionClasses: INodeActions<IAbstractNode>[];

  constructor() {
    this.nodeActionClasses = [];
  }

  public registerNodeActionClass(actionClass: INodeActions<IAbstractNode>) {
    this.nodeActionClasses.push(actionClass);
  }

  public connect(connectData: IConnect<IAbstractNode>) {
    console.log(connectData);
    debugger;
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

export const defaultRegistry = new NodeActionClassRegistry();
defaultRegistry.registerNodeActionClass(FunctionActions);
defaultRegistry.registerNodeActionClass(new BoolActions());
defaultRegistry.registerNodeActionClass(new InputNodeActions());
defaultRegistry.registerNodeActionClass(new OutputNodeActions());

export interface IAbstractNode {
  id: string;
  type: string;
}

export function initAbstractNode(type: string, id?: string, ): IAbstractNode {
  return {
    id: id || "" ,
    type
  };
}

/**
 * Parse through nodes recursively and find all ancestores of `forNode`
 * @param forNode Node to get all Ancestor IDs for
 * @param allNodes All Available nodes
 */
export function getAncenstorNodeIDs(
  forNode: IChildNode,
  allNodes: IAbstractNode[]
) {
  return getAncenstorNodes(forNode, allNodes).map((n) => n.id);
}

export function getAncenstorNodes(
  forNode: IChildNode,
  allNodes: IAbstractNode[]
): IAbstractNode[] {
  let ancestors: IAbstractNode[] = allNodes.filter((node) =>
    forNode.parentNodeIDs.includes(node.id)
  );
  for (const node of allNodes) {
    if (
      forNode.parentNodeIDs.indexOf(node.id) > -1 &&
      instanceOfIChildNode(node)
    ) {
      ancestors.push(...getAncenstorNodes(node, allNodes));
    }
  }
  return ancestors;
}

export function addNode(state: IAbstractNode[], node: IAbstractNode) {
  const _node = state.find((n) => n.id === node.id);
  if (_node) {
    throw new Error(`Node ID: ${node.id} is taken`);
  }
  state.push(node);
  return [...state];
}

export function removeNode(state: IAbstractNode[], nodeID: string) {
  const node = state.find((n) => n.id === nodeID);
  if (!node) {
    return state;
  }
  const index = state.indexOf(node);
  state.splice(index, 1);
  return [...state];
}

function findAndCD(
  state: IAbstractNode[],
  connectData: IConnect<IAbstractNode>,
  connect: boolean
): { state: IAbstractNode[]; updated: boolean } {
  const _node = state.find((n) => n.id === connectData.fromNode.id);
  if (!_node) {
    return { state, updated: false };
  }
  const index = state.indexOf(_node);
  const connectedNode = connect
    ? defaultRegistry.connect(connectData)
    : defaultRegistry.disconnect(connectData);
  state.splice(index, 1, connectedNode);
  return { state, updated: true };
}

export function connectNodes(
  state: IAbstractNode[],
  conenctData: IConnect<IAbstractNode>
): IAbstractNode[] {
  const _do = findAndCD(state, conenctData, true);
  if (_do.updated) {
    return [..._do.state];
  }
  return state;
}

export function disconnectNodes(
  state: IAbstractNode[],
  conenctData: IConnect<IAbstractNode>
): IAbstractNode[] {
  const _do = findAndCD(state, conenctData, false);
  if (_do.updated) {
    return [..._do.state];
  }
  return state;
}

export function initChildNode(type: string, id?: string): IChildNode {
  return {
    ...initAbstractNode(type, id),
    parentNodeIDs: [],
  };
}

export interface IChildNode extends IAbstractNode {
  parentNodeIDs: string[];
}

export function instanceOfIChildNode(object: any): object is IChildNode {
  return "parentNodeIDs" in object;
}

export interface IConnect<T extends IAbstractNode> {
  fromNode: T;
  toNodeID: string;
  connectionKey: string;
}

export interface INodeActions<T extends IAbstractNode> {
  instanceOf(node: IAbstractNode): boolean;
  connectNode(connectionData: IConnect<T>): T;
  disconnectNode(connectionData: IConnect<T>): T;
}
