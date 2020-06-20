import {IAbstractNode, getAncenstorNodeIDs, IChildNode} from './AbstractNode';

export const inputNode: IAbstractNode = {
    id: '1'
}

export const childNodes: IChildNode[] = [
    {
        id: '2',
        parentNodeIDs: ['1']
    },
    {
        id: '3',
        parentNodeIDs: ['1']
    },
    {
        id: '4',
        parentNodeIDs: ['2']
    },
    {
        id: '5',
        parentNodeIDs: ['4']
    }
]

export const allNodes = [inputNode, ...childNodes];

test('Ancenstors are 1, 2, and 4', () => {
    const ancenstors = getAncenstorNodeIDs(childNodes[3], allNodes);
    expect(ancenstors).toEqual(['4', '2', '1'])
});
