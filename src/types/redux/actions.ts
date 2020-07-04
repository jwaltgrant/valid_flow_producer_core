import { IType } from "..";
import { IBlockImplementation } from "../BlockImplementation";
import IFieldDef from "../../FieldDef";

export enum TYPE_ACTIONS {
  ADD_BLOCK = "ta_add_block",
  REMOVE_BLOCK = "ta_rm_block",
  UPDATE_BLOCK = "ta_update_block",
  ADD_FIELD = 'ta_add_field',
  REMOVE_FIELD = 'ta_rm_field',
  UPDATE_FIELD = 'ta_update_field'
}

export function addBlock(typeName: string, block: IBlockImplementation, parentKey?: string){
  return {
    type: TYPE_ACTIONS.ADD_BLOCK,
    typeName,
    block,
    parentKey
  }
}

export function removeBlock(typeName: string, blockName: string, parentKey?: string){
  return {
    type: TYPE_ACTIONS.REMOVE_BLOCK,
    typeName,
    blockName,
    parentKey
  }
}

export function updateBlock(typeName: string, block: IBlockImplementation, parentKey?: string){
  return {
    type: TYPE_ACTIONS.UPDATE_BLOCK,
    typeName,
    block,
    parentKey
  };
}

export function addField(typeName: string, newField: IFieldDef, parentKey?: string){
  return {
    type: TYPE_ACTIONS.ADD_FIELD,
    typeName,
    newField,
    parentKey
  };
}

export function removeField(typeName: string, fieldName: string, parentKey?: string){
  return {
    type: TYPE_ACTIONS.REMOVE_FIELD,
    typeName,
    fieldName,
    parentKey
  };
}

export function updateField(typeName: string, oldName: string, newField: IFieldDef, parentKey?: string){
  return {
    type: TYPE_ACTIONS.UPDATE_FIELD,
    typeName,
    newField,
    parentKey
  }
}
