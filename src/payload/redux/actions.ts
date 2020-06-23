import IFieldDef from "../../FieldDef";
import IDynamicKey from "../DynamicKey";


export enum PAYLOAD_ACTIONS{
    ADD_ITEM,
    REMOVE_ITEM,
    ADD_DYANMIC_KEY,
    REMOVE_DYNAMIC_KEY,
    CHANGE_KEY,
    CHANGE_TYPE,
    CLEAR
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
