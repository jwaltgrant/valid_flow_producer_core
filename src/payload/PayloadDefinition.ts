import IFieldDef from "../FieldDef";
import IDyamicKey from "./DynamicKey";
import { PayloadDefinitionError, PayloadErrorCode } from "../Errors";
import AbstractNode, { IChildNode, IAbstractNode, getAncenstorNodeIDs } from "../nodes/AbstractNode";
import IDynamicKey from "./DynamicKey";

export interface IPayloadDefinition {
  payloadItems: IFieldDef[];
  dynamicKeys: IDyamicKey[];
}

/**
 * Get the Payload Item with the provided name, if there is one
 * @param name Name of the payload item to find
 */
export function findPayloadItem(
  payloadDefinition: IPayloadDefinition,
  name: string
): IFieldDef {
  return payloadDefinition.payloadItems.find((item) => item.name === name);
}

/**
 * Get the Dynamic key with the provided name, if there is one
 * @param name Name of the dynamic key to find
 * @param nodeID ID of node to find dynamic key for
 */
export function findDynamicKey(
  payloadDefinition: IPayloadDefinition,
  name?: string,
  nodeID?: string
): IDynamicKey {
  if (name) {
    return payloadDefinition.dynamicKeys.find((key) => key.name === name);
  } else if (nodeID) {
    return payloadDefinition.dynamicKeys.find((key) => key.nodeID === nodeID);
  }
  return null;
}

/**
 * Check if there is an object with the provided name in the payload definition
 * @param name Name to check Payload Items and Dynamic Keys for
 */
export function hasItem(
  payloadDefinition: IPayloadDefinition,
  name: string
): boolean {
  return !!(
    findPayloadItem(payloadDefinition, name) ||
    findDynamicKey(payloadDefinition, name)
  );
}

/**
 * Add Payload Item and return a spread of the updated payload def
 * @param item Item to add to the payload
 */
export function addPayloadItem(payloadDefinition: IPayloadDefinition, item: IFieldDef): IPayloadDefinition{
  if(hasItem(payloadDefinition, item.name)){
    throw new Error(`Item with name: ${item.name} is already in use`);
  }
  const payloadItems = [...payloadDefinition.payloadItems, item];
  return {
    ...payloadDefinition,
    payloadItems
  };
}

/**
 * Add Dynamic Key and return a spread of the updated payload def
 * @param payloadDefinition IPayloadDefinition to add to
 * @param item Item to Add
 */
export function addDynamicKey(payloadDefinition: IPayloadDefinition, item: IDynamicKey): IPayloadDefinition{
  if(hasItem(payloadDefinition, item.name)){
    throw new Error(`Item with name: ${item.name} is already in use`);
  }
  const dynamicKeys = [...payloadDefinition.dynamicKeys, item];
  return {
    ...payloadDefinition,
    dynamicKeys
  };
}

/**
 * Remove item and add return a spread of the updated payload def
 * @param payloadDefinition IPayloadDefinition to remove item from
 * @param name Name of the item to remove
 */
export function removeItem(payloadDefinition: IPayloadDefinition, name: string): IPayloadDefinition{
  let payloadItems = [...payloadDefinition.payloadItems];
  let dynamicKeys = [...payloadDefinition.dynamicKeys];
  let index = payloadDefinition.payloadItems.indexOf(findPayloadItem(payloadDefinition, name));
  if(index >= -1){
    payloadItems.splice(index, 1);
  } else{
    index = payloadDefinition.dynamicKeys.indexOf(findDynamicKey(payloadDefinition, name));
    if(index >= -1){
      dynamicKeys.splice(index, 1);
    }
  }
  return { payloadItems, dynamicKeys };
}

/**
 * Get all the payload items (dynamicly created or otherwise) that a given node
 * has access to. Do this by determing all nodes that are ancenstors of the provided node
 * and adding the dynamic keys which are created by the ancestor nodes to the statically define
 * payload items that make up the flow input
 * @param payloadDefinition IPayloadDef to search for payload items
 * @param node Node to get all available payload items for
 * @param nodes Nodes to search through for all available payload items
 */
export function getAvailablePayloadItems(
  payloadDefinition: IPayloadDefinition,
  node: IChildNode,
  nodes: IAbstractNode[]
): IFieldDef[] {
  let payloadItems: IFieldDef[] = [...payloadDefinition.payloadItems];
  const nodeAncestors = getAncenstorNodeIDs(node, nodes);
  for (const dynamicKey of payloadDefinition.dynamicKeys) {
    if (nodeAncestors.includes(dynamicKey.nodeID)) {
      payloadItems.push(dynamicKey);
    }
  }
  return payloadItems;
}
