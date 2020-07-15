import { initChildNode } from "../AbstractNode";
import * as Block from "../blockInstance/BlockInstance";
export function initActionNode(actionKey) {
    return Object.assign(Object.assign({}, initChildNode()), { actionKey, block: Block.initBlockInstance(), returnKey: "" });
}
