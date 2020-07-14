import IFieldDef from "../../FieldDef";
export declare enum PAYLOAD_ACTIONS {
    ADD_ITEM = "add_item",
    REMOVE_ITEM = "rm_item",
    REPLACE_ITEM = "rep_item",
    ADD_DYANMIC_KEY = "add_d_key",
    REMOVE_DYNAMIC_KEY = "rm_d_key",
    CHANGE_KEY = "ch_key",
    CHANGE_TYPE = "ch_type",
    CLEAR = "cl"
}
export declare function addItem(item: IFieldDef): {
    type: PAYLOAD_ACTIONS;
    item: IFieldDef;
};
export declare function removeItem(name: string): {
    type: PAYLOAD_ACTIONS;
    name: string;
};
export declare function replaceItem(oldName: string, newItem: IFieldDef): {
    type: PAYLOAD_ACTIONS;
    oldName: string;
    newItem: IFieldDef;
};
export declare function changeKey(oldKey: string, newKey: string): {
    type: PAYLOAD_ACTIONS;
    oldKey: string;
    newKey: string;
};
export declare function changeType(name: string, newType: string): {
    type: PAYLOAD_ACTIONS;
    name: string;
    newType: string;
};
export declare function clear(): {
    type: PAYLOAD_ACTIONS;
};
