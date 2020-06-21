import { IBlockDef } from "../BlockDef";
import { IArgDef } from "../ArgDef";

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

export interface IBlockInstance {
  blockSetKey: string;
  blockKey: string;
  args: IArgInstance[];
  returnType: string;
  returnKey: string;
}

export function fromBlockDef(
    blockSetKey: string,
    blockDef: IBlockDef,
    block?: IBlockInstance
): IBlockInstance {
    const _block: IBlockInstance = {
        blockSetKey: blockSetKey,
        blockKey: blockDef.blockKey,
        args: blockDef.args.map(mapFromArgDef),
        returnType: blockDef.returnType,
        returnKey: ''
    };
    return block ? {..._block, ...block} : _block;
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
