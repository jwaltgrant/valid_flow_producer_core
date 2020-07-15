import { createReducerSet } from "../utils/reducerSet";
import typeStore from "../types/redux";
import { IType } from "../types";

const findType = (items: IType[], key: string) => {
  return items.find((item) => item.typeName === key);
};

export const typesStore = createReducerSet(typeStore, findType);
