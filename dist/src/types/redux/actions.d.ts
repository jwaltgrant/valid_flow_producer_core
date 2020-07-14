import { IType } from "..";
export declare enum TYPE_ACTIONS {
    ADD_TYPE = "ta_add",
    REMOVE_TYPE = "ta_rm"
}
export declare function addType(newType: IType): {
    type: TYPE_ACTIONS;
    newType: IType;
};
export declare function removeType(typeName: string): {
    type: TYPE_ACTIONS;
    typeName: string;
};
