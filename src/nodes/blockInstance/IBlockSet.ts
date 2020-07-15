import { IBlockArg } from "./BlockArg";

export default interface IBlockSet {
  key: string;
  displayName?: string;
  opperations: IBlockDef[];
}

export interface IBlockDef {
  key: string;
  uiString?: string;
  args?: IBlockArg[];
  listArgs?: boolean;
  listArgType?: string;
  returnType?: string;
}
