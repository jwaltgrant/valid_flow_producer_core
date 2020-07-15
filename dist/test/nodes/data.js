export const actionNodeData = {
    block: {
        blockSetKey: "person",
        blockKey: "overAge",
        args: [
            {
                name: "person",
                value: {
                    fName: "Josh",
                    lName: "Grant",
                    dateOfBirth: "06-07-1993",
                },
            },
            {
                name: "age",
                value: 25,
            },
        ],
    },
    id: 1,
    actionKey: "bool",
    returnKey: "personIsOverAge",
};
export let voidActionData = Object.assign(Object.assign({}, actionNodeData), { actionKey: "VOID", targets: [1, 3, 5] });
export let booleanActionData = Object.assign(Object.assign({}, actionNodeData), { actionKey: "BOOLEAN", falseTargets: [2, 4, 6], trueTargets: [1, 3, 5] });
