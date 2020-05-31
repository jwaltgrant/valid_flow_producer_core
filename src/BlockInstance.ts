import ArgInstance, { IArgInstance } from './ArgInstance';

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
     * Upade Block Isntance, this should be called everytime the user chagnes
     * This is basically creating an entirely new object, but allows the same references
     * to to be held.
     * @param blockSetKey Block Set Key to save onto this function
     * @param blockKey Block key to save onto this function
     * @param args ArgumentDefinitions to save onto this function
     */
    updateFunction(blockSetKey: string, blockKey: string, args: ArgInstance[]) {
        this.blockSetKey = blockSetKey;
        this.blockKey = blockKey;
        this.args = args;
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