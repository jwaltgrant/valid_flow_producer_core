import { INodeActions, IAbstractNode, IConnect } from ".";
declare class NodeActionClassRegistry {
    private nodeActionClasses;
    constructor();
    registerNodeActionClass(actionClass: INodeActions<IAbstractNode>): void;
    connect(connectData: IConnect<IAbstractNode>): IAbstractNode;
    disconnect(connectData: IConnect<IAbstractNode>): IAbstractNode;
}
declare const NodeActionRegistry: NodeActionClassRegistry;
export default NodeActionRegistry;
