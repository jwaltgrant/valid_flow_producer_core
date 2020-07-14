import { IAbstractNode, IConnect } from "..";
import { IBlockDef } from "../blockInstance/IBlockSet";
import { IArgInstance } from "../blockInstance/BlockInstance";
/**
 * Collection of Static Functions used by the NodeStore Reducer
 */
export declare class NodeHelpers {
    /**
     * Add a node to the state, ensuring no duplication of ID
     * @param state List of IAbstractNodes
     * @param node Node to add
     */
    static addNode(state: IAbstractNode[], node: IAbstractNode): IAbstractNode[];
    /**
     * Remove a node with provided ID from a list of nodes
     * @param state List of Nodes
     * @param nodeID ID of a node to remove
     */
    static removeNode(state: IAbstractNode[], nodeID: string): IAbstractNode[];
    /**
     * Find a node and up date connections
     * @param state List of Nodes
     * @param connectData IConnect with all needed (dis)connnection data
     * @param connect If the nodes should be connected (true) or disconnected
     */
    private static findAndCD;
    /**
     * Connect two nodes
     * @param state List of Nodes
     * @param conenctData Object containing all connection data
     */
    static connectNodes(state: IAbstractNode[], conenctData: IConnect<IAbstractNode>): IAbstractNode[];
    /**
     * Disconnect two nodes
     * @param state List of Nodes
     * @param conenctData Object containing all disconnection data
     */
    static disconnectNodes(state: IAbstractNode[], conenctData: IConnect<IAbstractNode>): IAbstractNode[];
}
export declare class ActionNodeHelpers {
    private static findActionNode;
    static updateBlock(state: IAbstractNode[], nodeID: string, blockSetKey: string, blockDef: IBlockDef): IAbstractNode[];
    static updateArg(state: IAbstractNode[], nodeID: string, argInstance: IArgInstance): IAbstractNode[];
    static setReturnKey(state: IAbstractNode[], nodeID: string, returnKey: string | null): IAbstractNode[];
}
