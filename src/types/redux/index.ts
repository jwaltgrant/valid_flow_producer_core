import { IType } from "..";
import {TYPE_ACTIONS} from './actions';

const initialState: IType[] = [];

export default function typesStore(state = initialState, action: any): IType[] {
  let index = state.findIndex((s) => s.typeName === action.typeName);
  let blockIndex;
  let fieldIndex;
  let typeInstance: IType;
  switch(action.type){
    case TYPE_ACTIONS.ADD_TYPE:
      return [...state, action.newType];
    case TYPE_ACTIONS.REMOVE_TYPE:
      if(index === -1){
        return state;
      }
      state.splice(index, 1);
      return [...state];
    case TYPE_ACTIONS.ADD_BLOCK:
      if(index === -1){
        return state;
      }
      typeInstance = {...state[index]};
      typeInstance.blocks.push(action.block);
      state.splice(index, 1, typeInstance);
      return [...state];
    case TYPE_ACTIONS.REMOVE_BLOCK:
      if(index === -1){
        return state;
      }
      typeInstance = { ...state[index] };
      blockIndex = typeInstance.blocks.findIndex((b) => b.name === action.blockName);
      if(blockIndex === -1){
        return state;
      }
      typeInstance.blocks.splice(blockIndex, 1);
      state.splice(index, 1, typeInstance);
      return [...state];
    case TYPE_ACTIONS.UPDATE_BLOCK:
      if(index === -1){
        return state;
      }
      typeInstance = { ...state[index] };
      blockIndex = typeInstance.blocks.findIndex((b) => b.name === action.blockName);
      if(blockIndex === -1){
        typeInstance.blocks.push(action.block);
      } else {
        typeInstance.blocks.splice(blockIndex, 1, action.block);
      }
      state.splice(index, 1, typeInstance);
      return [...state];
    case TYPE_ACTIONS.ADD_FIELD:
      if(index === -1){
        return state;
      }
      typeInstance = { ...state[index] };
      typeInstance.fields.push(action.newField);
      state.splice(index, 1, typeInstance);
      return [...state];
    case TYPE_ACTIONS.REMOVE_FIELD:
      if(index === -1){
        return state;
      }
      typeInstance = { ...state[index] };
      fieldIndex = typeInstance.fields.findIndex(f => f.name === action.fieldName);
      if(fieldIndex === -1){
        return state;
      }
      typeInstance.fields.splice(fieldIndex, 1);
      state.splice(index, 1, typeInstance);
      return [...state];
    case TYPE_ACTIONS.UPDATE_FIELD:
      if(index === -1){
        return state;
      }
      typeInstance = { ...state[index] };
      fieldIndex = typeInstance.fields.findIndex(f => f.name === action.oldName);
      if(fieldIndex === -1){
        return state;
      }
      typeInstance.fields.splice(fieldIndex, 1, action.newField);
      state.splice(index, 1, typeInstance);
      return [...state];
  }
  return state;
}
