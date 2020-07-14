import IBlockSet from "../IBlockSet";
export declare enum BLOCK_SET_ACTIONS {
    RECIEVE_BLOCK_SET = "rc_block_set",
    REMOVE_BLOCK_SET = "rm_block_set"
}
export declare function recieveBlockSet(blockSet: IBlockSet): {
    type: BLOCK_SET_ACTIONS;
    blockSet: IBlockSet;
};
export declare function removeBlockSet(blockSetKey: string): {
    type: BLOCK_SET_ACTIONS;
    blockSetKey: string;
};
