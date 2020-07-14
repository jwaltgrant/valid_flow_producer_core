import { IBlockArg } from "./BlockArg";
import { IBlockDef } from "./IBlockSet";

export interface IArgInstance {
  name: string;
  value: any;
  payloadElement: boolean;
}

function mapFromArgDef(argDef: IBlockArg): IArgInstance {
  return {
    name: argDef.name,
    value: argDef.default,
    payloadElement: false,
  };
}

export function initBlockInstance(): IBlockInstance {
  return {
    blockSetKey: "",
    blockKey: "",
    args: [],
  };
}

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

export function fromBlockDef(block: ISetBlock): IBlockInstance {
  let _block: IBlockInstance = {
    blockSetKey: block.blockSetKey,
    blockKey: "",
    args: [],
  };
  if (block.blockDef) {
    _block = {
      ..._block,
      blockKey: block.blockDef.blockKey,
      args: block.blockDef.args.map(mapFromArgDef),
    };
  }
  return _block;
}

export function updateArg(block: IBlockInstance, argInstance: IArgInstance) {
  const args = [...block.args];
  const arg = args.find((a) => a.name === argInstance.name);
  if (!arg) {
    return block;
  }
  const index = args.indexOf(arg);
  args.splice(index, 1, argInstance);
  return {
    ...block,
    args,
  };
}
