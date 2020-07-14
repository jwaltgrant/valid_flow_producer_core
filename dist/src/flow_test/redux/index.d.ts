import { ITestPayload, ITestResult } from "..";
export interface rState {
    testPayload: ITestPayload;
    testResults: ITestResult[];
}
export default function testPayloadReducer(state: rState, action: any): rState;
