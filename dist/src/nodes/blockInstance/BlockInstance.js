function mapFromArgDef(argDef) {
    return {
        name: argDef.name,
        value: argDef.default,
        payloadElement: false,
    };
}
export function initBlockInstance() {
    return {
        blockSetKey: "",
        blockKey: "",
        args: [],
    };
}
export function fromBlockDef(block) {
    let _block = {
        blockSetKey: block.blockSetKey,
        blockKey: "",
        args: [],
    };
    if (block.blockDef) {
        _block = Object.assign(Object.assign({}, _block), { blockKey: block.blockDef.blockKey, args: block.blockDef.args.map(mapFromArgDef) });
    }
    return _block;
}
export function updateArg(block, argInstance) {
    const args = [...block.args];
    const arg = args.find((a) => a.name === argInstance.name);
    if (!arg) {
        return block;
    }
    const index = args.indexOf(arg);
    args.splice(index, 1, argInstance);
    return Object.assign(Object.assign({}, block), { args });
}
