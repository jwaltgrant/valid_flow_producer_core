import nodeReducer from '.';
import * as Actions from './actions';
import {boolAction} from '../action/BoolActions.test';
import {funcAction as _funcAction} from '../action/FunctionAction.test';
import { IAbstractNode } from '../AbstractNode';
import { BooleanConnectionKey } from '../action/BooleanAction';
import { FunctionActionKey } from '../action/FunctionAction';

const funcAction = { ..._funcAction, id: "function_actiosn" };

describe('Node Reducer Tests', () => {
    let state: IAbstractNode[] = [];
    test('Initial State', () => {
        expect(nodeReducer(undefined, {})).toEqual(state);
    });

    test('Add Node', () => {
        state = nodeReducer(state, Actions.addNode(boolAction));
        expect(state).toEqual([boolAction]);
        state = nodeReducer(state, Actions.addNode(funcAction));
        expect(state).toEqual([boolAction, funcAction]);
        expect(() => {
            nodeReducer(state, Actions.addNode({id: '1'}));
        }).toThrow();
        expect(state).toEqual([boolAction, funcAction]);
    });
    test('Remove Node', () => {
        state = nodeReducer(state, Actions.removeNode('3'));
        expect(state).toEqual([boolAction, funcAction]);
        state = nodeReducer(state, Actions.removeNode(boolAction.id));
        expect(state).toEqual([funcAction]);
        state = nodeReducer(state, Actions.removeNode(funcAction.id));
        expect(state).toEqual([]);        
    });
    test('Connect and Disconnect', () => {
        state = nodeReducer(state, Actions.addNode(boolAction));
        state = nodeReducer(state, Actions.addNode(funcAction));
        const init = state;
        let connectedBool = {...boolAction, falseTargets: [funcAction.id]};
        let connectedFunc = {...funcAction, parentNodeIDs: [boolAction.id]};
        state = nodeReducer(state, Actions.connectNode({
            fromNode: {...boolAction},
            toNodeID: funcAction.id,
            connectionKey: BooleanConnectionKey.FALSE
        }));
        expect(state).toEqual([connectedBool, funcAction]);
        state = nodeReducer(state, Actions.connectNode({
            fromNode: {...funcAction},
            toNodeID: connectedBool.id,
            connectionKey: FunctionActionKey.INPUT
        }));
        expect(state).toEqual([connectedBool, connectedFunc]);

        state = nodeReducer(state, Actions.disconnectNode({
            fromNode: connectedBool,
            toNodeID: connectedFunc.id,
            connectionKey: BooleanConnectionKey.FALSE
        }));
        expect(state).toEqual([
            {...boolAction, falseTargets: []},
            connectedFunc
        ]);
        state = nodeReducer(state, Actions.disconnectNode({
            fromNode: connectedFunc,
            toNodeID: boolAction.id,
            connectionKey: FunctionActionKey.INPUT
        }));
        expect(state).toEqual([
          { ...boolAction, falseTargets: [] },
          {...connectedFunc, parentNodeIDs: []},
        ]);
        expect(state).not.toBe(init);
    })
});

