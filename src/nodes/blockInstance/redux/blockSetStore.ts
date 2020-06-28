import * as Actions from './actions';
import IBlockSet from '../IBlockSet';

const initialState: IBlockSet[] = [];

export default function blockSetStore(state = initialState, action: any){
    switch(action.type){
        case Actions.BLOCK_SET_ACTIONS.RECIEVE_BLOCK_SET:
            return [...state, action.blockSet]
        case Actions.BLOCK_SET_ACTIONS.REMOVE_BLOCK_SET:
            const blockSet = state.find((bs) => bs.blockSetKey === action.blockSetKey);
            if(!blockSet){
                return state;
            }
            const index = state.indexOf(blockSet);
            state.splice(index, 1);
            return [...state];
        default:
            return state;
    }
}

