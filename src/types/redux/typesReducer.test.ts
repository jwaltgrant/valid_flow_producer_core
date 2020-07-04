import * as Actions from './actions';
import reducer from '.';
import { IType } from '..';
import IFieldDef from '../../FieldDef';
import { IBlockImplementation } from '../BlockImplementation';

let state: IType = {
    typeName: '',
    fields: [],
    blocks: []
}

describe('Types Reducer Tests', () => {
    test('Initial State', () => {
        expect(reducer(undefined, {})).toEqual(state);
    });
    test('Change Name', () => {
        state = reducer(state, Actions.changeName('type1'));
        expect(state.typeName).toEqual('type1');
    });
    test('Add Field', () => {
        let field: IFieldDef = {
            name: 'field1',
            type: 'any'
        }
        expect(state.fields.find(f => f.name === field.name)).toBeUndefined();
        state = reducer(state, Actions.addField(field));
        expect(state.fields.find((f) => f.name === field.name)).toEqual(field);
    });
    test('Update Field', () => {
        let updated: IFieldDef = {
            name: 'new_name',
            type: 'number'
        };
        expect(state.fields.find(f => f.name === updated.name)).toBeUndefined();
        state = reducer(state, Actions.updateField('field1', updated));
        expect(state.fields.find((f) => f.name === updated.name)).toEqual(updated);
    });
    test('Remove Field', () => {
        expect(
          state.fields.find((f) => f.name === 'new_name')
        ).not.toBeUndefined();
        state = reducer(state, Actions.removeField('new_name'));
        expect(
            state.fields.find(f => f.name === 'new_name')
        ).toBeUndefined();
    });
    test('Add Block', () => {
        let block: IBlockImplementation = {
            name: 'some_func',
            inputNode: {targets: [], id: 'i1'},
            outputNodes: [],
            actions: []
        }
        expect(state.blocks.length).toEqual(0);
        state = reducer(state, Actions.addBlock(block));
        expect(state.blocks.find(b => b.name === block.name)).toEqual(block);
    });
    test('Update Block', () => {
        let block: IBlockImplementation = {
          name: "some_func",
          inputNode: { targets: [], id: "i1" },
          outputNodes: [],
          actions: [{
              id: 'a1',
              parentNodeIDs: ['i1'],
          }],
        };
        expect(state.blocks.find(b => b.name === block.name).actions.length).toEqual(0);
        state = reducer(state, Actions.updateBlock(block.name, block));
        expect(
          state.blocks.find((b) => b.name === block.name).actions[0]
        ).toEqual(block.actions[0]);
    });
    test('Remove Block', () => {
        expect(state.blocks.find(b => b.name === 'some_func')).not.toBeUndefined();
        state = reducer(state, Actions.removeBlock('some_func'));
        expect(state.blocks.find(b => b.name === 'some_func')).toBeUndefined();
    })
})

