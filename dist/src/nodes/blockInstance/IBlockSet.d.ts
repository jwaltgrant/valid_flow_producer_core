import { IBlockArg } from "./BlockArg";
export default interface IBlockSet {
    blockSetKey: string;
    blocks: IBlockDef[];
}
export interface IBlockDef {
    blockKey: string;
    uiString?: string;
    args?: IBlockArg[];
    listArgs?: boolean;
    listArgType?: string;
    returnType?: string;
}
