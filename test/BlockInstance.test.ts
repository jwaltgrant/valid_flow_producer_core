import { blockSetData } from './data';
import BlockInstance from '../src/BlockInstance';
import BlockSet from '../src/BlockSet'
import ArgInstance from '../src/ArgInstance';


test('Set Block Data', () => {
    const blockSets = blockSetData.map((blockSetData) => BlockSet.deserialise(blockSetData));
    const block = new BlockInstance();
    
    let blockDef = blockSets[0].findBlock('gt');
    block.changeBlock(blockSets[0].bockSetKey, blockDef);
    expect(block.args.length).toBe(2);
    expect(block.args[0].name).toBe('lhs');
    expect(block.args[1].name).toBe('rhs');

    blockDef = blockSets[0].findBlock('sum');
    block.changeBlock(blockSets[0].bockSetKey, blockDef);
    expect(block.args.length).toBe(0);
    block.setArg(new ArgInstance('test', 10));
    expect(block.args.length).toBe(1);
    expect(block.args[0].name).toBe('test');
    expect(block.args[0].value).toBe(10);
})