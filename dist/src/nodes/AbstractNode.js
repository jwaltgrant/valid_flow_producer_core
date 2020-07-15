export function initAbstractNode(id) {
    return { id: id || "" };
}
/**
 * Parse through nodes recursively and find all ancestores of `forNode`
 * @param forNode Node to get all Ancestor IDs for
 * @param allNodes All Available nodes
 */
export function getAncenstorNodeIDs(forNode, allNodes) {
    return getAncenstorNodes(forNode, allNodes).map((n) => n.id);
}
export function getAncenstorNodes(forNode, allNodes) {
    let ancestors = allNodes.filter((node) => forNode.parentNodeIDs.includes(node.id));
    for (const node of allNodes) {
        if (forNode.parentNodeIDs.indexOf(node.id) > -1 &&
            instanceOfIChildNode(node)) {
            ancestors.push(...getAncenstorNodes(node, allNodes));
        }
    }
    return ancestors;
}
export function initChildNode(id) {
    return Object.assign(Object.assign({}, initAbstractNode(id)), { parentNodeIDs: [] });
}
export function instanceOfIChildNode(object) {
    return "parentNodeIDs" in object;
}
