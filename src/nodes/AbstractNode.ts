import { IBlockInstance } from "../BlockInstance";

export interface IAbstractNode{
    block: IBlockInstance;
    id: number;
}

export default abstract class AbstractNode implements IAbstractNode{
    block: IBlockInstance;
    id: number;

    constructor(id: number, block?: IBlockInstance){
        this.id = id;
        this.block = block;
    }

    setBlock(block: IBlockInstance){
        this.block = block;
    }
}