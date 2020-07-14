export interface INodeActions<T extends IAbstractNode> {
    instanceOf(node: IAbstractNode): boolean;
    connectNode(connectionData: IConnect<T>): T;
    disconnectNode(connectionData: IConnect<T>): T;
}
export interface IAbstractNode {
    id: string;
}
export declare function initAbstractNode(id?: string): IAbstractNode;
/**
 * Parse through nodes recursively and find all ancestores of `forNode`
 * @param forNode Node to get all Ancestor IDs for
 * @param allNodes All Available nodes
 */
export declare function getAncenstorNodeIDs(forNode: IChildNode, allNodes: IAbstractNode[]): string[];
export declare function getAncenstorNodes(forNode: IChildNode, allNodes: IAbstractNode[]): IAbstractNode[];
export declare function initChildNode(id?: string): IChildNode;
export interface IChildNode extends IAbstractNode {
    parentNodeIDs: string[];
}
export declare function instanceOfIChildNode(object: any): object is IChildNode;
export interface IConnect<T extends IAbstractNode> {
    fromNode: T;
    toNodeID: string;
    connectionKey: string;
}
