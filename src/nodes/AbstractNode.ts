import { IBlockInstance } from "../BlockInstance";

export class NodeActionClassRegistry{
  private nodeActionClasses: INodeActions<AbstractNode>[];

  public registerNodeActionClass(actionClass: INodeActions<AbstractNode>){
    this.nodeActionClasses.push(actionClass);
  }

  public connect(connectData: IConnect<AbstractNode>){
    for(const actionClass of this.nodeActionClasses){
      if(actionClass.instanceOf(connectData.parentNode)){
        return actionClass.connectNode(connectData);
      }
    }
    throw new Error(`No Action class registered for ${connectData.parentNode}`);
  }
  public disconnect(connectData: IConnect<AbstractNode>){
    for(const actionClass of this.nodeActionClasses){
      if(actionClass.instanceOf(connectData.parentNode)){
        return actionClass.disconnectNode(connectData);
      }
    }
    throw new Error(`No Action class registered for ${connectData.parentNode}`);
  }
}

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

export interface IChildNode extends IAbstractNode {
  parentNodeIDs: string[];
  getAncenstorNodeIDs?: (nodes: AbstractNode[]) => string[];
}

export function instanceOfIChildNode(object: any): object is IChildNode{
    return ('parentNodeIDs' in object);
}

export interface IConnect<T extends IAbstractNode>{
  parentNode: T;
  childNodeID: string;
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