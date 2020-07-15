export default class ValidFlowError extends Error {
}
export var PayloadErrorCode;
(function (PayloadErrorCode) {
    PayloadErrorCode[PayloadErrorCode["UNKNOWN"] = 0] = "UNKNOWN";
    PayloadErrorCode[PayloadErrorCode["TAKEN_NAME"] = 1] = "TAKEN_NAME";
    PayloadErrorCode[PayloadErrorCode["INVALID_NAME"] = 2] = "INVALID_NAME";
})(PayloadErrorCode || (PayloadErrorCode = {}));
export class PayloadDefinitionError extends ValidFlowError {
    constructor(message, errorCode) {
        super(message);
        this.errorCode = PayloadErrorCode.UNKNOWN;
        this.errorCode = errorCode;
    }
}
