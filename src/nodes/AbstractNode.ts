import { IBlockInstance } from "../BlockInstance";

export interface IAbstractNode{
    id: number;
}

export default abstract class AbstractNode implements IAbstractNode{
    id: number;

    constructor(id: number){
        this.id = id;
    }
}