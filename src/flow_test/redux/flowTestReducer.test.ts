import { IPayloadDefinition } from "../../payload/PayloadDefinition";
import * as Actions from './actions';
import { ITestPayload, ITestField } from "..";
import reducer from '.';

const payloadDef: IPayloadDefinition = {
    payloadItems: [
        {
            name: 'field1',
            type: 'string'
        },
        {
            name: 'field2',
            type: 'number'
        },
        {
            name: 'field3',
            type: 'any'
        }
    ],
    dynamicKeys: []
}

describe('Flow Test Reducer Tests', () => {
    let state: ITestPayload = null;
    test('Initial State', () => {
        expect(reducer(undefined, {})).toEqual(null);
    });
    test('Initialize from Payload', () => {
        state = reducer(state, Actions.initializeFromPayloadDef(payloadDef, 'test1'));
        expect(state.name).toEqual('test1');
        expect(state.fields.length).toEqual(payloadDef.payloadItems.length);
        state.fields.forEach((field) => {
            const item = payloadDef.payloadItems.find((i) => i.name === field.name);
            expect(item).not.toBeNull();
            expect(item.type).toEqual(field.type);
        })
    });
    test('Updating Test Field', () => {
        const field = {...state.fields[0]}
        field.testVal = 'SOME_VAL';
        expect(state.fields[0]).not.toEqual(field);
        state = reducer(state, Actions.updateTestField(field));
        expect(state.fields[0]).toEqual(field);
    });
    test('Add Test Field', () => {
        const newField: ITestField = {
            name: 'field4',
            type: 'number',
            testVal: 4
        }
        const length = state.fields.length;
        state = reducer(state, Actions.addTestField(newField));
        expect(state.fields.length).toEqual(length + 1);
        expect(state.fields[length]).toEqual(newField);
    });
});
