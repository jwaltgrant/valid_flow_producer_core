import IFieldDef from '../FieldDef';
import IDyamicKey from './DynamicKey';
import {PayloadDefinitionError, PayloadErrorCode} from '../Errors';

/**
 * Payload Definition allows the user to create definition of the input
 * That a model will recieve in running. This will be used to allow users
 * to select payload Items and operate with them throughout the flow model
 */
export default class PayloadDefinition{
    public payloadItems: IFieldDef[] = [];
    public dynamicKeys: IDyamicKey[] = [];

    constructor(payloadItems?: IFieldDef[], dyamicKeys?: IDyamicKey[]){
        if(payloadItems){
            this.payloadItems = payloadItems;
        }
        if(dyamicKeys){
            this.dynamicKeys = dyamicKeys;
        }
    }

    /**
     * Check if there is an object with the provided name in the payload definition
     * @param name Name to check Payload Items and Dynamic Keys for
     */
    public hasItemNamed(name: string) : boolean{
        for(const item of this.payloadItems){
            if(item.name === name){
                return true;
            }
        }
        for(const item of this.dynamicKeys){
            if(item.name === name){
                return true;
            }
        }
        return false;
    }

    /**
     * Change the Type of a Payload Item
     * **ONLY USED for Payload Items**
     * @param itemName Name of the payloadItem to change the type of
     * @param newType Type to change the Payload Item type to
     */
    public changeItemType(itemName: string, newType: string){
        for(const item of this.payloadItems){
            if(item.name === itemName){
                item.type = newType;
                break;
            }
        }
    }

    public addPayloadItem(item: IFieldDef){
        if(this.hasItemNamed(item.name)){
            throw new PayloadDefinitionError(`Name: ${item.name} is taken`, PayloadErrorCode.TAKEN_NAME);
        }
    }
}