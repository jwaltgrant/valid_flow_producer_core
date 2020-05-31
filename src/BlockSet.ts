interface IArgDef{
    name: string;
    type?: string;
}

interface IBlock{
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

    static deserialise(data: IBlockSet){
        let blockSet = new BlockSet();
        Object.assign(blockSet, data);
    }
}

class Block{

}