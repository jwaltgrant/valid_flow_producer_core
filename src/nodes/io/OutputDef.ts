export interface IOutputDef {}

export default class OutputDef{
    outputPairs: OutputPair[];
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
