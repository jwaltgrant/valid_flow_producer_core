import { IType } from "..";

export enum TYPE_ACTIONS {
  ADD_TYPE = "ta_add",
  REMOVE_TYPE = "ta_rm",
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
