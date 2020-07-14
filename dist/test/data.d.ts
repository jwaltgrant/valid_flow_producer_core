export declare const blockDefData: ({
    blockKey: string;
    uiString: string;
    args: {
        name: string;
        type: string;
    }[];
    returnType: string;
    listArgs?: undefined;
    listArgType?: undefined;
} | {
    blockKey: string;
    uiString: string;
    listArgs: boolean;
    listArgType: string;
    returnType: string;
    args?: undefined;
})[];
export declare const blockSetData: {
    blockSetKey: string;
    blocks: ({
        blockKey: string;
        uiString: string;
        args: {
            name: string;
            type: string;
        }[];
        returnType: string;
        listArgs?: undefined;
        listArgType?: undefined;
    } | {
        blockKey: string;
        uiString: string;
        listArgs: boolean;
        listArgType: string;
        returnType: string;
        args?: undefined;
    })[];
}[];
