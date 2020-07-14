import { IArgDef } from "./ArgDef";

export default interface IBlockSet {
  key: string;
  displayName?: string;
  opperations: IBlockDef[];
}

export interface IBlockDef {
  key: string;
  uiString?: string;
  args?: IArgDef[];
  listArgs?: boolean;
  listArgType?: string;
  returnType?: string;
}
