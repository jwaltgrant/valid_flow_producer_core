import IFieldDef from "../FieldDef";
import { IChildNode, IAbstractNode } from "../nodes/AbstractNode";
export interface IPayloadDefinition {
    payloadItems: IFieldDef[];
}
/**
 * Get the Payload Item with the provided name, if there is one
 * @param name Name of the payload item to find
 */
export declare function findPayloadItem(payloadDefinition: IPayloadDefinition, name: string): IFieldDef;
/**
 * Check if there is an object with the provided name in the payload definition
 * @param name Name to check Payload Items and Dynamic Keys for
 */
export declare function hasItem(payloadDefinition: IPayloadDefinition, name: string): boolean;
/**
 * Add Payload Item and return a spread of the updated payload def
 * @param item Item to add to the payload
 */
export declare function addPayloadItem(payloadDefinition: IPayloadDefinition, item: IFieldDef): IPayloadDefinition;
/**
 * Remove item and add return a spread of the updated payload def
 * @param payloadDefinition IPayloadDefinition to remove item from
 * @param name Name of the item to remove
 */
export declare function removeItem(payloadDefinition: IPayloadDefinition, name: string): IPayloadDefinition;
/**
 * Get all the payload items (dynamicly created or otherwise) that a given node
 * has access to. Do this by determing all nodes that are ancenstors of the provided node
 * and adding the dynamic keys which are created by the ancestor nodes to the statically define
 * payload items that make up the flow input
 * @param payloadDefinition IPayloadDef to search for payload items
 * @param node Node to get all available payload items for
 * @param nodes Nodes to search through for all available payload items
 */
export declare function getAvailablePayloadItems(payloadDefinition: IPayloadDefinition, node: IChildNode, nodes: IAbstractNode[]): IFieldDef[];
