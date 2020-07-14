import { IArgDef } from "./ArgDef";

export default interface IBlockSet {
  blockSetKey: string;
  blocks: IBlockDef[];
}

export interface IBlockDef {
  blockKey: string;
  uiString?: string;
  args?: IArgDef[];
  listArgs?: boolean;
  listArgType?: string;
  returnType?: string;
}
