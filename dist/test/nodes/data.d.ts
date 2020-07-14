export declare const actionNodeData: {
    block: {
        blockSetKey: string;
        blockKey: string;
        args: ({
            name: string;
            value: {
                fName: string;
                lName: string;
                dateOfBirth: string;
            };
        } | {
            name: string;
            value: number;
        })[];
    };
    id: number;
    actionKey: string;
    returnKey: string;
};
export declare let voidActionData: {
    actionKey: string;
    targets: number[];
    block: {
        blockSetKey: string;
        blockKey: string;
        args: ({
            name: string;
            value: {
                fName: string;
                lName: string;
                dateOfBirth: string;
            };
        } | {
            name: string;
            value: number;
        })[];
    };
    id: number;
    returnKey: string;
};
export declare let booleanActionData: {
    actionKey: string;
    falseTargets: number[];
    trueTargets: number[];
    block: {
        blockSetKey: string;
        blockKey: string;
        args: ({
            name: string;
            value: {
                fName: string;
                lName: string;
                dateOfBirth: string;
            };
        } | {
            name: string;
            value: number;
        })[];
    };
    id: number;
    returnKey: string;
};
