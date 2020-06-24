import { IBlockInstance } from "../BlockInstance";
import { FunctionActions } from "./action/FunctionAction";
import { BoolActions } from "./action/BooleanAction";

export class NodeActionClassRegistry{
  private nodeActionClasses: INodeActions<IAbstractNode>[];

  constructor() {
    this.nodeActionClasses = []
  }

  public registerNodeActionClass(actionClass: INodeActions<IAbstractNode>){
    this.nodeActionClasses.push(actionClass);
  }

  public connect(connectData: IConnect<IAbstractNode>){
    for(const actionClass of this.nodeActionClasses){
      if(actionClass.instanceOf(connectData.fromNode)){
        return actionClass.connectNode(connectData);
      }
    }
    throw new Error(`No Action class registered for ${connectData.fromNode}`);
  }
  public disconnect(connectData: IConnect<IAbstractNode>){
    for(const actionClass of this.nodeActionClasses){
      if(actionClass.instanceOf(connectData.fromNode)){
        return actionClass.disconnectNode(connectData);
      }
    }
    throw new Error(`No Action class registered for ${connectData.fromNode}`);
  }
}

export const defaultRegistry = new NodeActionClassRegistry();
defaultRegistry.registerNodeActionClass(new FunctionActions());
defaultRegistry.registerNodeActionClass(new BoolActions());

export interface IAbstractNode{
    id: string;
}

/**
 * Parse through nodes recursively and find all ancestores of `forNode`
 * @param forNode Node to get all Ancestor IDs for
 * @param allNodes All Available nodes
 */
export function getAncenstorNodeIDs(forNode: IChildNode, allNodes: IAbstractNode[]){
    let ancestors: string[] = [...forNode.parentNodeIDs];
    for (const node of allNodes) {
      if (
        forNode.parentNodeIDs.indexOf(node.id) > -1 &&
        instanceOfIChildNode(node)
      ) {
        ancestors.push(...getAncenstorNodeIDs(node, allNodes));
      }
    }
    return ancestors;
}

export function addNode(state: IAbstractNode[], node: IAbstractNode){
  const _node = state.find((n) => n.id === node.id);
  if(_node){
    throw new Error(`Node ID: ${node.id} is taken`);
  }
  state.push(node);
  return [...state];
}

export function removeNode(state: IAbstractNode[], nodeID: string){
  const node = state.find((n) => n.id === nodeID);
  if(!node){
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
): {state: IAbstractNode[], updated: boolean}{
    const _node = state.find((n) => n.id === connectData.fromNode.id);
    if (!_node) {
      return {state, updated: false};
    }
    const index = state.indexOf(_node);
    const connectedNode = connect ? defaultRegistry.connect(connectData): defaultRegistry.disconnect(connectData);
    state.splice(index, 1, connectedNode);
    return {state, updated: true};
}

export function connectNodes(
  state: IAbstractNode[],
  conenctData: IConnect<IAbstractNode>,
): IAbstractNode[]{
  const _do = findAndCD(state, conenctData, true);
  if(_do.updated){
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

export interface IChildNode extends IAbstractNode {
  parentNodeIDs: string[];
  getAncenstorNodeIDs?: (nodes: AbstractNode[]) => string[];
}

export function instanceOfIChildNode(object: any): object is IChildNode{
    return ('parentNodeIDs' in object);
}

export interface IConnect<T extends IAbstractNode>{
  fromNode: T;
  toNodeID: string;
  connectionKey: string;
}

export interface INodeActions<T extends IAbstractNode> {
  instanceOf(node: IAbstractNode): boolean;
  connectNode(connectionData: IConnect<T>): T;
  disconnectNode(connectionData: IConnect<T>): T;
}

export default abstract class AbstractNode implements IAbstractNode{
    id: string;
    displayLabel: string;
    abstract addConnection(toId: string, connectionKey: string): void;
    abstract removeConnection(fromId: string, connectionKey: string): void;

    constructor(id: string){
        this.id = id;
    }

    serialize(): IAbstractNode{
        return {
            id: this.id
        }
    }
}