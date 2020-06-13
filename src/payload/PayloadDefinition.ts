import IFieldDef from "../FieldDef";
import IDyamicKey from "./DynamicKey";
import { PayloadDefinitionError, PayloadErrorCode } from "../Errors";
import AbstractNode, { IChildNode } from "../nodes/AbstractNode";

/**
 * Payload Definition allows the user to create definition of the input
 * That a model will recieve in running. This will be used to allow users
 * to select payload Items and operate with them throughout the flow model
 */
export default class PayloadDefinition {
  public payloadItems: IFieldDef[] = [];
  public dynamicKeys: IDyamicKey[] = [];

  constructor(payloadItems?: IFieldDef[], dyamicKeys?: IDyamicKey[]) {
    if (payloadItems) {
      this.payloadItems = payloadItems;
    }
    if (dyamicKeys) {
      this.dynamicKeys = dyamicKeys;
    }
  }

  /**
   * Get the Payload Item with the provided name, if there is one
   * @param name Name of the payload item to find
   */
  public findPayloadItem(name: string) {
    return this.payloadItems.find((item) => item.name === name);
  }

  /**
   * Get the Dynamic key with the provided name, if there is one
   * @param name Name of the dynamic key to find
   * @param nodeID ID of node to find dynamic key for
   */
  public findDynamicKey(name?: string, nodeID?: string) {
    if (name) {
      return this.dynamicKeys.find((key) => key.name === name);
    } else if (nodeID) {
      return this.dynamicKeys.find((key) => key.nodeID === nodeID);
    }
    return null;
  }

  /**
   * Check if there is an object with the provided name in the payload definition
   * @param name Name to check Payload Items and Dynamic Keys for
   */
  public hasItemNamed(name: string): boolean {
    if (this.findPayloadItem(name) || this.findDynamicKey(name)) {
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
  public changeItemType(itemName: string, newType: string) {
    for (const item of this.payloadItems) {
      if (item.name === itemName) {
        item.type = newType;
        break;
      }
    }
  }

  /**
   * Add Item to Payload Definition, ensuring the item's key is not already in use
   * @param item Item to add to the payload
   */
  public addPayloadItem(item: IFieldDef) {
    if (this.hasItemNamed(item.name)) {
      throw new PayloadDefinitionError(
        `Name: ${item.name} is taken`,
        PayloadErrorCode.TAKEN_NAME
      );
    }
    this.payloadItems.push(item);
  }

  /**
   * Remove Payload Item with the provided name
   * @param name Name of the Payload Item to Remove
   */
  public removePayloadItem(name: string) {
    const index = this.payloadItems.indexOf(this.findPayloadItem(name));
    if (index > -1) {
      this.payloadItems.splice(index, 1);
    }
  }

  public addDynamicKey(dynamicKey: IDyamicKey) {
    if (this.hasItemNamed(dynamicKey.name)) {
      throw new PayloadDefinitionError(
        `Name: ${dynamicKey.name} is taken`,
        PayloadErrorCode.TAKEN_NAME
      );
    } else if (this.findDynamicKey(null, dynamicKey.nodeID)) {
      throw new PayloadDefinitionError(
        `Existing Key for Node ID: ${dynamicKey.nodeID}`,
        PayloadErrorCode.UNKNOWN
      );
    }
    this.dynamicKeys.push(dynamicKey);
  }

  /**
   * Remove Dynamic Key with the provided name
   * @param name Name of the Dynamic Key to remove
   * @param nodeID ID of the node which the Dynamic Key correlates to
   */
  public removeDynamicKey(name?: string, nodeID?: string) {
    let index = -1;
    if (name) {
      index = this.dynamicKeys.indexOf(this.findDynamicKey(name));
    } else if (nodeID) {
      index = this.dynamicKeys.indexOf(this.findDynamicKey(null, nodeID));
    }
    if (index > -1) {
      this.dynamicKeys.splice(index, 1);
    }
  }

  /**
   * Change (or add if not found) a dynamic key's content
   * @param nodeID Node ID to Change Key for
   * @param dynamicKey New Data to populate with
   */
  public changeDynamicKey(nodeID: string, dynamicKey: IDyamicKey) {
    const dk = this.findDynamicKey(null, nodeID);
    if (dk) {
      dk.name = dynamicKey.name;
      dk.type = dynamicKey.type;
    } else {
      this.addDynamicKey(dynamicKey);
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
  public getAvailablePayloadItems(
    node: IChildNode,
    nodes: AbstractNode[]
  ): IFieldDef[] {
    let payloadItems: IFieldDef[] = [...this.payloadItems];
    const nodeAncestors = node.getAncenstorNodeIDs(nodes);
    for (const dynamicKey of this.dynamicKeys) {
      if (nodeAncestors.includes(dynamicKey.nodeID)) {
        payloadItems.push(dynamicKey);
      }
    }
    return payloadItems;
  }
}
