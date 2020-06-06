import IFieldDef from '../FieldDef';
import IDyamicKey from './DynamicKey';
import {PayloadDefinitionError, PayloadErrorCode} from '../Errors';
import AbstractNode, { IChildNode } from '../nodes/AbstractNode';

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
     * Get the Payload Item with the provided name, if there is one
     * @param name Name of the payload item to find
     */
    public findPayloadItem(name: string){
        return this.payloadItems.find((item) => item.name === name);
    }

    /**
     * Get the Dynamic key with the provided name, if there is one
     * @param name Name of the dynamic key to find
     */
    public findDynameKey(name: string){
        return this.dynamicKeys.find((key) => key.name === name);
    }

    /**
     * Check if there is an object with the provided name in the payload definition
     * @param name Name to check Payload Items and Dynamic Keys for
     */
    public hasItemNamed(name: string) : boolean{
        if(this.findPayloadItem(name) || this.findDynameKey(name)){
            return true;
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

    /**
     * Add Item to Payload Definition, ensuring the item's key is not already in use
     * @param item Item to add to the payload
     */
    public addPayloadItem(item: IFieldDef){
        if(this.hasItemNamed(item.name)){
            throw new PayloadDefinitionError(`Name: ${item.name} is taken`, PayloadErrorCode.TAKEN_NAME);
        }
        this.payloadItems.push(item);
    }

    /**
     * Remove Payload Item with the provided name
     * @param name Name of the Payload Item to Remove
     */
    public removePayloadItem(name: string){
        const index = this.payloadItems.indexOf(this.findPayloadItem(name));
        if(index > -1){
            this.payloadItems.splice(index, 1);
        }
    }

    public addDynamicKey(dynamicKey: IDyamicKey){
        if(this.hasItemNamed(dynamicKey.name)){
            throw new PayloadDefinitionError(`Name: ${dynamicKey.name} is taken`, PayloadErrorCode.TAKEN_NAME);
        }
        this.dynamicKeys.push(dynamicKey);
    }

    /**
     * Remove Dynamic Key with the provided name
     * @param name Name of the Dynamic Key to remove
     */
    public removeDynamicKey(name: string){
        const index = this.payloadItems.indexOf(this.findDynameKey(name));
        if(index > -1){
            this.dynamicKeys.splice(index, 1);
        }
    }

    /**
     * Get all the payload items (dynamicly created or otherwise) that a given node
     * has access to. Do this by determing all nodes that are ancenstors of the provided node
     * and adding the dynamic keys which are created by the ancestor nodes to the statically define
     * payload items that make up the flow input
     * @param node Node to get all available payload items for
     * @param nodes Nodes to search through for all available payload items
     */
    public getAvailablePayloadItems(node: IChildNode, nodes: AbstractNode[]): IFieldDef[]{
        let payloadItems: IFieldDef[] = this.payloadItems;
        const nodeAncestors = node.getAncenstorNodeIDs(nodes);
        for(const dynamicKey of this.dynamicKeys){
            if(nodeAncestors.includes(dynamicKey.nodeID)){
                payloadItems.push(dynamicKey);
            }
        }
        return payloadItems;
    }
}