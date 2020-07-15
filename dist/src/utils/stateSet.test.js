import * as StateSet from './stateSet';
import FlowTestReducer from '../flow_test/redux';
import * as FlowTestActions from '../flow_test/redux/actions';
const testPayload1 = {
    name: "p1",
    fields: [
        {
            name: "f1",
            type: "any",
            testVal: 1,
        },
        {
            name: "f2",
            type: "any",
            testVal: 2,
        },
        {
            name: "f3",
            type: "any",
            testVal: 3,
        },
    ],
};
const child1 = {
    testPayload: testPayload1,
    testResults: []
};
const testPayload2 = {
    name: "p2",
    fields: [
        {
            name: "f4",
            type: "any",
            testVal: 4,
        },
        {
            name: "f5",
            type: "any",
            testVal: 5,
        },
        {
            name: "f6",
            type: "any",
            testVal: 6,
        },
    ],
};
const child2 = {
    testPayload: testPayload2,
    testResults: [],
};
const findItem = (items, name) => {
    return items.find((i) => {
        return i.testPayload.name === name;
    });
};
const { reducer, addItem, removeItem, activateItem } = StateSet.createStateSet(FlowTestReducer, findItem);
describe('State Set Tests', () => {
    let state = {
        activeItemKey: null,
        items: []
    };
    test('Initial State', () => {
        expect(reducer(undefined, {})).toEqual(state);
    });
    test('Add Item', () => {
        expect(state.items.length).toEqual(0);
        state = reducer(state, addItem(child1));
        expect(state.items.length).toEqual(1);
        expect(state.items[0]).toEqual(child1);
        state = reducer(state, addItem(child2));
        expect(state.items.length).toEqual(2);
        expect(state.items[1]).toEqual(child2);
    });
    test('Activate Item', () => {
        expect(state.activeItemKey).toEqual(null);
        state = reducer(state, activateItem(testPayload1.name));
        expect(state.activeItemKey).toEqual(testPayload1.name);
    });
    test('Find Active Item', () => {
        expect(findItem(state.items, state.activeItemKey)).toEqual(child1);
    });
    test('Child Actions', () => {
        const field = {
            name: "NEW_FIELD",
            type: "any",
            testVal: 5,
        };
        let updated = findItem(state.items, state.activeItemKey);
        expect(updated.testPayload.fields.length).toEqual(testPayload1.fields.length);
        expect(updated.testPayload.fields.find((i) => i.name === field.name)).toBeUndefined();
        state = reducer(state, FlowTestActions.addTestField(field));
        updated = findItem(state.items, state.activeItemKey);
        expect(updated.testPayload.fields.length).toEqual(testPayload1.fields.length + 1);
        expect(updated.testPayload.fields.find((i) => i.name === field.name)).toEqual(field);
    });
    test('Remove Item', () => {
        expect(state.activeItemKey).not.toBeNull();
        expect(state.items.length).toEqual(2);
        state = reducer(state, removeItem(testPayload1.name));
        expect(state.activeItemKey).toBeNull();
        expect(state.items.length).toEqual(1);
    });
});
