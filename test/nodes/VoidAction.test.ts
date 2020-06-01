import VoidAction, { IVoidAction } from '../../src/nodes/action/VoidAction';
import { voidActionData } from './data';

test('Void Deserialization', () => {
    let voidAction = VoidAction.deserialize(<IVoidAction>voidActionData);
    expect(voidAction.targets).toBe(voidActionData.targets);
    
});
