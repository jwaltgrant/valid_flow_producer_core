import { IType } from "..";
import { IBlockImplementation } from "../BlockImplementation";

export enum TYPE_ACTIONS {
  ADD_TYPE = "ta_add",
  REMOVE_TYPE = "ta_rm",
  ADD_BLOCK = "ta_add_block",
  REMOVE_BLOCK = "ta_rm_block",
  UPDATE_BLOCK = "ta_update_block"
}

export function addType(newType: IType) {
  return {
    type: TYPE_ACTIONS.ADD_TYPE,
    newType,
  };
}

export function removeType(typeName: string) {
  return {
    type: TYPE_ACTIONS.REMOVE_TYPE,
    typeName,
  };
}

export function addBlock(typeName: string, block: IBlockImplementation){
  return {
    type: TYPE_ACTIONS.ADD_BLOCK,
    typeName,
    block
  }
}

export function removeBlock(typeName: string, blockName: string){
  return {
    type: TYPE_ACTIONS.REMOVE_BLOCK,
    typeName,
    blockName
  }
}

export function updateBlock(typeName: string, block: IBlockImplementation){
  return {
    type: TYPE_ACTIONS.UPDATE_BLOCK,
    typeName,
    block
  };
}
