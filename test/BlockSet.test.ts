import BlockSet from './BlockSet';
import { blockSetData } from '../test/data';

test('Deserialize BlockSet', () => {
    const blockSet = BlockSet.deserialise(blockSetData[0]);
    expect(blockSet.findBlock("gt")).not.toBeNull();
    expect(blockSet.findBlock("sum")).not.toBeNull();
    expect(blockSet.findBlock('missinng')).toBeUndefined();
});
