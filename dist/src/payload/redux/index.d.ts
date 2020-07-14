import * as Payload from "../PayloadDefinition";
export interface IPayloadState extends Payload.IPayloadDefinition {
    invalidKey: string;
}
export default function payloadState(state: IPayloadState, action: any): IPayloadState;
