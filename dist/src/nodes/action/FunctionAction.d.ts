import { IActionNode } from "./ActionNode";
import { INodeActions, IAbstractNode, IConnect } from "../AbstractNode";
export interface IFunctionAction extends IActionNode {
    targets: string[];
}
export declare function initFunctionAction(): IFunctionAction;
export declare enum FunctionActionKey {
    INPUT = "input",
    OUTPUT = "output"
}
declare class FunctionActions implements INodeActions<IFunctionAction> {
    instanceOf(node: IAbstractNode): boolean;
    connectNode(connectionData: IConnect<IFunctionAction>): IFunctionAction;
    disconnectNode(connectionData: IConnect<IFunctionAction>): IFunctionAction;
    private getConnectionList;
}
declare const actions: FunctionActions;
export default actions;
