import { createReducerSet } from "../utils/reducerSet";
import typeStore from "../types/redux";
import { IType } from "../types";

const BASE_TYPES = ["Number", "Boolean", "Datetime", "String"];

const findType = (items: IType[], key: string) => {
  return items.find((item) => item.typeName === key);
};

export const typesStore = createReducerSet(typeStore, findType);
BASE_TYPES.forEach((baseType) =>
  typesStore.addItem({
    typeName: baseType.toLocaleLowerCase(),
    displayName: baseType,
    fields: [],
    blocks: [],
  })
);
