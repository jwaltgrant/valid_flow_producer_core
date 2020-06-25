import { IBlockDef } from "./BlockDef";
import { IArgDef } from "./ArgDef";

export interface IArgInstance {
  name: string;
  value: any;
  payloadElement: boolean;
}

function mapFromArgDef(argDef: IArgDef): IArgInstance{
    return {
        name: argDef.name,
        value: argDef.default,
        payloadElement: false
    };
}

export function initBlockInstance(): IBlockInstance {
    return {
        blockSetKey: '',
        blockKey: '',
        args: []
    }
}

export interface IBlockInstance {
  blockSetKey: string;
  blockKey: string;
  args: IArgInstance[];
}

export interface ISetBlock{
    blockSetKey: string,
    blockDef: IBlockDef,
    block?: IBlockInstance
}

export function fromBlockDef(
    block: ISetBlock
): IBlockInstance {
    const _block: IBlockInstance = {
      blockSetKey: block.blockSetKey,
      blockKey: block.blockDef.blockKey,
      args: block.blockDef.args.map(mapFromArgDef),
      returnType: block.blockDef.returnType,
      returnKey: "",
    };
    return block.block ? {..._block, returnKey: block.block.returnKey} : _block;
}

export function updateArg(block: IBlockInstance, argInstance: IArgInstance){
    const args = [...block.args];
    const arg = args.find((a) => a.name === argInstance.name);
    if(!arg){
        return block;
    }
    const index = args.indexOf(arg);
    args.splice(index, 1, argInstance);
    return {
        ...block,
        args
    };
}
