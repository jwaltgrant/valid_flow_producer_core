import { IType } from "..";
import {TYPE_ACTIONS} from './actions';

const initialState: IType = {
  typeName: '',
  fields: [],
  blocks: []
};

export default function typesStore(state = initialState, action: any): IType {
  let blockIndex;
  let fieldIndex;
  switch(action.type){
    case TYPE_ACTIONS.CHANGE_NAME:
      return {
        ...state,
        typeName: action.name
      }
    case TYPE_ACTIONS.ADD_BLOCK:
      state.blocks.push(action.block);
      return {...state};
    case TYPE_ACTIONS.REMOVE_BLOCK:
      blockIndex = state.blocks.findIndex((b) => b.name === action.blockName);
      if(blockIndex === -1){
        return state;
      }
      state.blocks.splice(blockIndex, 1);
      return {...state};
    case TYPE_ACTIONS.UPDATE_BLOCK:
      blockIndex = state.blocks.findIndex((b) => b.name === action.oldName);
      if(blockIndex === -1){
        state.blocks.push(action.block);
      } else {
        state.blocks.splice(blockIndex, 1, action.block);
      }
      return {...state};
    case TYPE_ACTIONS.ADD_FIELD:
      state.fields.push(action.newField);
      return {...state};
    case TYPE_ACTIONS.REMOVE_FIELD:
      fieldIndex = state.fields.findIndex(f => f.name === action.fieldName);
      if(fieldIndex === -1){
        return state;
      }
      state.fields.splice(fieldIndex, 1);
      return {...state};
    case TYPE_ACTIONS.UPDATE_FIELD:
      fieldIndex = state.fields.findIndex(f => f.name === action.oldName);
      if(fieldIndex === -1){
        return state;
      }
      state.fields.splice(fieldIndex, 1, action.newField);
      return {...state};
  }
  return state;
}
