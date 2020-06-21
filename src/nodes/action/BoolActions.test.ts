import * as Bool from './BooleanAction';

const actions = new Bool.BoolActions();

describe('Bool Actions Tests', () => {
    const boolAction: Bool.IBooleanAction = {
        falseTargets: [],
        trueTargets: [],
        parentNodeIDs: [],
        block: null,
        id: '1'
    };

    test('Instance Of', () => {
        const other: {parentNodeIDs: any[], id: string} = {
            parentNodeIDs: [],
            id: '2'
        };
        expect(actions.instanceOf(other)).toBeFalsy();
        expect(actions.instanceOf(boolAction)).toBeTruthy();
    });

    test
});
