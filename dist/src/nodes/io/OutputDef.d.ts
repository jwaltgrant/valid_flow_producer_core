export interface IOutputDef {
    outputPairs: IOutputPair[];
}
export declare function initOutputDef(): IOutputDef;
export interface IOutputPair {
    key: string;
    payloadElement: boolean;
    literalDef?: ILiteralOutputDef;
    payloadKey?: string;
}
export interface ILiteralOutputDef {
    type: string;
    value: any;
}
