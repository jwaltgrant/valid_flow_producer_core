export default class ValidFlowError extends Error {
}
export declare enum PayloadErrorCode {
    UNKNOWN = 0,
    TAKEN_NAME = 1,
    INVALID_NAME = 2
}
export declare class PayloadDefinitionError extends ValidFlowError {
    errorCode: PayloadErrorCode;
    constructor(message: string, errorCode?: PayloadErrorCode);
}
