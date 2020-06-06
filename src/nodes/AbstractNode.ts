import { IBlockInstance } from "../BlockInstance";

export interface IAbstractNode{
    id: number;
}

export interface IChildNode {
  parentNodeIDs: number[];
  getAncenstorNodeIDs?: (nodes: AbstractNode[]) => number[];
}

export function instanceOfIChildNode(object: any): object is IChildNode{
    return ('parentNodeIDs' in object) && ('getAncenstorNodeIDs' in object);
}

export default abstract class AbstractNode implements IAbstractNode{
    id: number;

    constructor(id: number){
        this.id = id;
    }

    serialize(): IAbstractNode{
        return {
            id: this.id
        }
    }
}