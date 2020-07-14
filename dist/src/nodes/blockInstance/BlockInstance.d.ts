import { IBlockDef } from "./IBlockSet";
export interface IArgInstance {
    name: string;
    value: any;
    payloadElement: boolean;
}
export declare function initBlockInstance(): IBlockInstance;
export interface IBlockInstance {
    blockSetKey: string;
    blockKey: string;
    args: IArgInstance[];
}
export interface ISetBlock {
    blockSetKey: string;
    blockDef: IBlockDef;
    block?: IBlockInstance;
}
export declare function fromBlockDef(block: ISetBlock): IBlockInstance;
export declare function updateArg(block: IBlockInstance, argInstance: IArgInstance): IBlockInstance;
