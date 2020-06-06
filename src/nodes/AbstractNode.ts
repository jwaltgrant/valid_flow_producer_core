import { IBlockInstance } from "../BlockInstance";

export interface IAbstractNode{
    id: string;
}

export interface IChildNode {
  parentNodeIDs: string[];
  getAncenstorNodeIDs?: (nodes: AbstractNode[]) => string[];
}

export function instanceOfIChildNode(object: any): object is IChildNode{
    return ('parentNodeIDs' in object) && ('getAncenstorNodeIDs' in object);
}

export default abstract class AbstractNode implements IAbstractNode{
    id: string;

    constructor(id: string){
        this.id = id;
    }

    serialize(): IAbstractNode{
        return {
            id: this.id
        }
    }
}