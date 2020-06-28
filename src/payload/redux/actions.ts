import IFieldDef from "../../FieldDef";
import IDynamicKey from "../DynamicKey";


export enum PAYLOAD_ACTIONS{
    ADD_ITEM = 'add_item',
    REMOVE_ITEM = 'rm_item',
    REPLACE_ITEM = 'rep_item',
    ADD_DYANMIC_KEY = 'add_d_key',
    REMOVE_DYNAMIC_KEY = 'rm_d_key',
    CHANGE_KEY = 'ch_key',
    CHANGE_TYPE = 'ch_type',
    CLEAR = 'cl'
}

export function addItem(item: IFieldDef){
    return {
        type: PAYLOAD_ACTIONS.ADD_ITEM,
        item
    };
}

export function removeItem(name: string){
    return {
      type: PAYLOAD_ACTIONS.REMOVE_ITEM,
      name,
    };
}

export function replaceItem(oldName: string, newItem: IFieldDef){
    return {
        type: PAYLOAD_ACTIONS.REPLACE_ITEM,
        oldName,
        newItem
    }
}

export function addDynamicKey(dynamicKey: IDynamicKey){
    return {
        type: PAYLOAD_ACTIONS.ADD_DYANMIC_KEY,
        dynamicKey
    };
}

export function removeDynamicKey(name: string){
    return {
        type: PAYLOAD_ACTIONS.REMOVE_DYNAMIC_KEY,
        name
    };
}

export function changeKey(oldKey: string, newKey: string){
    return {
      type: PAYLOAD_ACTIONS.CHANGE_KEY,
        oldKey,
        newKey
    };
}

export function changeType(name: string, newType: string){
    return {
      type: PAYLOAD_ACTIONS.CHANGE_TYPE,
        name,
        newType,
    };
}

export function clear(){
    return {
        type:PAYLOAD_ACTIONS.CLEAR
    }
}
