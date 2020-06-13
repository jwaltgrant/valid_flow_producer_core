import { IBlockDef } from "./BlockDef";

interface IBlockSet {
  blockSetKey: string;
  blocks: IBlockDef[];
}

export default class BlockSet implements IBlockSet {
  blockSetKey: string;
  blocks: IBlockDef[];

  findBlock(blockKey: string) {
    return this.blocks.find((block) => block.blockKey === blockKey);
  }

  static deserialise(data: IBlockSet): BlockSet {
    let blockSet = new BlockSet();
    Object.assign(blockSet, data);
    return blockSet;
  }
}
