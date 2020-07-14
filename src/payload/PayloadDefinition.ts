import IFieldDef from "../FieldDef";
import {
  IChildNode,
  IAbstractNode,
  getAncenstorNodes,
} from "../nodes/AbstractNode";
import { IActionNode } from "../nodes/action/ActionNode";

export interface IPayloadDefinition {
  payloadItems: IFieldDef[];
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
 * Check if there is an object with the provided name in the payload definition
 * @param name Name to check Payload Items and Dynamic Keys for
 */
export function hasItem(
  payloadDefinition: IPayloadDefinition,
  name: string
): boolean {
  return !!findPayloadItem(payloadDefinition, name);
}

/**
 * Add Payload Item and return a spread of the updated payload def
 * @param item Item to add to the payload
 */
export function addPayloadItem(
  payloadDefinition: IPayloadDefinition,
  item: IFieldDef
): IPayloadDefinition {
  if (hasItem(payloadDefinition, item.name)) {
    throw new Error(`Item with name: ${item.name} is already in use`);
  }
  const payloadItems = [...payloadDefinition.payloadItems, item];
  return {
    ...payloadDefinition,
    payloadItems,
  };
}

/**
 * Remove item and add return a spread of the updated payload def
 * @param payloadDefinition IPayloadDefinition to remove item from
 * @param name Name of the item to remove
 */
export function removeItem(
  payloadDefinition: IPayloadDefinition,
  name: string
): IPayloadDefinition {
  let payloadItems = [...payloadDefinition.payloadItems];
  let index = payloadDefinition.payloadItems.indexOf(
    findPayloadItem(payloadDefinition, name)
  );
  if (index >= 0) {
    payloadItems.splice(index, 1);
  }
  return { payloadItems };
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
  const nodeAncestors = getAncenstorNodes(node, nodes);
  for (const node of nodeAncestors) {
    if ((node as IActionNode).returnKey) {
      payloadItems.push({ name: (node as IActionNode).returnKey, type: "any" });
    }
  }
  return payloadItems;
}
