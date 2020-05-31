import ArgInstance, { IArgInstance } from './ArgInstance';
import { IBlockDef } from './BlockDef';

export interface IBlockInstance{
    blockSetKey: string;
    blockKey: string;
    args: IArgInstance[];    
}

export default class BlockInstance implements IBlockInstance{
    blockSetKey: string;
    blockKey: string;
    args: ArgInstance[];

    constructor(blockSetKey?: string, blockKey?: string, args?: ArgInstance[]){
        this.blockSetKey = blockSetKey;
        this.blockKey = blockKey;
        this.args = args || [];
    }

    /**
     * Change the Block Def being used in this insntance
     * @param blockSetKey Block Set Key for the set to be used in this instance
     * @param blockDef Block to populate block instance with
     */
    changeBlock(blockSetKey: string, blockDef: IBlockDef){
        this.blockSetKey = blockSetKey;
        this.blockKey = blockDef.blockKey;
        this.args = blockDef.args.map((arg) => {
            return new ArgInstance(arg.name, arg.default, false);
        });
    }

    /**
     * 
     * @param arg ArgInstance with values to set
     */
    setArg(arg: ArgInstance){
        let toSet = this.args.find((_arg) => {
            return arg.name === _arg.name;
        });
        if(toSet){
            toSet = arg;
        } else{
            this.args.push(arg);
        }
    }
}