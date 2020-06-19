import { IBlockInstance } from "../BlockInstance";

export interface IAbstractNode{
    id: string;
}

export function getAncenstorNodeIDs(forNode: IChildNode, allNodes: IAbstractNode[]){
    let ancestors: string[] = [];
    ancestors.push(...forNode.parentNodeIDs);
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