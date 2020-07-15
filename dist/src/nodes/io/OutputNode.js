import { initChildNode } from "../AbstractNode";
export function instanceOfOutputNode(node) {
    return "outputPairs" in node;
}
/**
 * Initialize an empty IOputNode
 */
export function initOutputNode(id) {
    return Object.assign(Object.assign({}, initChildNode(id)), { outputPairs: [] });
}
export function addOutputPair(node, pair) {
    if (node.outputPairs.find((p) => p.key === pair.key)) {
        throw new Error(`Key of name: ${pair.key} is taken`);
    }
    return Object.assign(Object.assign({}, node), { outputPairs: [...node.outputPairs, pair] });
}
export function updateOutPair(node, pair) {
    const index = node.outputPairs.findIndex((_pair) => pair.key === _pair.key);
    if (index === -1) {
        return Object.assign(Object.assign({}, node), { outputPairs: [...node.outputPairs, pair] });
    }
    node.outputPairs.splice(index, 1, pair);
    return Object.assign(Object.assign({}, node), { outputPairs: [...node.outputPairs] });
}
/**
 * Remove a pair from the pairs
 * @param pairs Pairs to remove one from
 * @param pairKey Key of the pair to remove
 */
export function removeOutputPair(node, pairKey) {
    const index = node.outputPairs.findIndex((_pair) => pairKey === _pair.key);
    if (index === -1) {
        return node;
    }
    node.outputPairs.splice(index, 1);
    return Object.assign(Object.assign({}, node), { outputPairs: [...node.outputPairs] });
}
