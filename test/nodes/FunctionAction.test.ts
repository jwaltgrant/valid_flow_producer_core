import FunctionAction, { IFunctionAction } from '../../src/nodes/action/FunctionAction';
import { voidActionData } from './data';

test('Void Deserialization', () => {
    let voidAction = FunctionAction.deserialize(<IFunctionAction>voidActionData);
    expect(voidAction.targets).toBe(voidActionData.targets);
    
});
