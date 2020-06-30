export interface IOutputDef {
    outputPairs: IOutputPair[];
}

export function initOutputDef(): IOutputDef{
    return {
        outputPairs: []
    }
}

export interface IOutputPair{
    key: string;
    payloadElemet: boolean;
    literalDef?: ILiteralOutputDef;
    payloadKey?: string;
}

export interface ILiteralOutputDef{
    type: string;
    value: any;
}
