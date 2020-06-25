import { IBlockDef } from "./nodes/blockInstance/BlockDef";

export default interface IBlockSet {
  blockSetKey: string;
  blocks: IBlockDef[];
}
