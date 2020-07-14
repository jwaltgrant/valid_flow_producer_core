import { IActionNode } from "./ActionNode";
import { INodeActions, IAbstractNode, IConnect } from "../AbstractNode";
export interface IBooleanAction extends IActionNode {
    falseTargets: string[];
    trueTargets: string[];
}
export declare function initBooleanAction(): IBooleanAction;
export declare enum BooleanConnectionKey {
    INPUT = "i",
    FALSE = "f",
    TRUE = "t"
}
declare class BoolActions implements INodeActions<IBooleanAction> {
    instanceOf(node: IAbstractNode): boolean;
    connectNode(connectionData: IConnect<IBooleanAction>): IBooleanAction;
    disconnectNode(connectionData: IConnect<IBooleanAction>): IBooleanAction;
    private getConnectionList;
}
declare const actions: BoolActions;
export default actions;
