interface IArgDef{
    name: string;
    type?: string;
}

export interface IBlock{
    blockKey: string;
    uiString?: string;
    args?: IArgDef[];
    listArgs?: boolean;
    listArgType?: string;
    returnType?: string;
}
interface IBlockSet{
    blockSetKey: string;
    blocks: IBlock[];
}

export default class BlockSet{
    bockSetKey: string;
    blocks: Block[];

    findBlock(blockKey: string){
        return this.blocks.find((block) => block.blockKey === blockKey);
    }

    static deserialise(data: IBlockSet): BlockSet{
        let blockSet = new BlockSet();
        Object.assign(blockSet, data);
        return blockSet;
    }
}

class Block implements IBlock {
  blockKey: string;
  uiString?: string;
  args?: IArgDef[];
  listArgs?: boolean;
  listArgType?: string;
  returnType?: string;
}