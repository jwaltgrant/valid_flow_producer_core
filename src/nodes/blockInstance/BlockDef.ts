import { IArgDef } from './ArgDef';

export interface IBlockDef {
  blockKey: string;
  uiString?: string;
  args?: IArgDef[];
  listArgs?: boolean;
  listArgType?: string;
  returnType?: string;
}

export default class BlockDef implements IBlockDef {
  blockKey: string;
  uiString?: string;
  args?: IArgDef[];
  listArgs?: boolean;
  listArgType?: string;
  returnType?: string;
}
