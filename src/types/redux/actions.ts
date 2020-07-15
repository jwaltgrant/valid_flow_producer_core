import { IBlockImplementation } from "../BlockImplementation";
import IFieldDef from "../../FieldDef";

export enum TYPE_ACTIONS {
  CHANGE_NAME = 'ta_change_name',
  ADD_BLOCK = "ta_add_block",
  REMOVE_BLOCK = "ta_rm_block",
  UPDATE_BLOCK = "ta_update_block",
  ADD_FIELD = 'ta_add_field',
  REMOVE_FIELD = 'ta_rm_field',
  UPDATE_FIELD = 'ta_update_field'
}

export function changeName(name: string){
  return {
    type: TYPE_ACTIONS.CHANGE_NAME,
    name
  }
}

export function addBlock(block: IBlockImplementation, parentKey?: string){
  return {
    type: TYPE_ACTIONS.ADD_BLOCK,
    block,
    parentKey
  }
}

export function removeBlock(blockName: string, parentKey?: string){
  return {
    type: TYPE_ACTIONS.REMOVE_BLOCK,
    blockName,
    parentKey
  }
}

export function updateBlock(oldName: string, block: IBlockImplementation, parentKey?: string){
  return {
    type: TYPE_ACTIONS.UPDATE_BLOCK,
    oldName,
    block,
    parentKey
  };
}

export function addField(newField: IFieldDef, parentKey?: string){
  return {
    type: TYPE_ACTIONS.ADD_FIELD,
    newField,
    parentKey
  };
}

export function removeField(fieldName: string, parentKey?: string){
  return {
    type: TYPE_ACTIONS.REMOVE_FIELD,
    fieldName,
    parentKey
  };
}

export function updateField(oldName: string, newField: IFieldDef, parentKey?: string){
  return {
    type: TYPE_ACTIONS.UPDATE_FIELD,
    oldName,
    newField,
    parentKey
  }
}
