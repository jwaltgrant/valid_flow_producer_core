export interface IOutputDef {
    outputPairs: OutputPair[];
}

export default class OutputDef{
    outputPairs: OutputPair[];
}

export function initOutputDef(): IOutputDef{
    return {
        outputPairs: []
    }
}

export class OutputPair{
    key: string;
    payloadElemet: boolean;
    literalDef?: LiteralOutputDef;
    payloadKey?: string;
}

export class LiteralOutputDef{
    type: string;
    value: any;
}
