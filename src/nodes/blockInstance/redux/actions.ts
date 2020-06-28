import IBlockSet from "../IBlockSet";

export enum BLOCK_SET_ACTIONS {
    RECIEVE_BLOCK_SET = 'rc_block_set',
    REMOVE_BLOCK_SET = 'rm_block_set'
}

export function recieveBlockSet(blockSet: IBlockSet){
    return {
        type: BLOCK_SET_ACTIONS.RECIEVE_BLOCK_SET,
        blockSet
    }
}

export function removeBlockSet(blockSetKey: string){
    return{
        type: BLOCK_SET_ACTIONS.REMOVE_BLOCK_SET,
        blockSetKey
    }
}
