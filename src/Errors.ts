export default class ValidFlowError extends Error {}

export enum PayloadErrorCode {
  UNKNOWN = 0,
  TAKEN_NAME = 1,
  INVALID_NAME = 2,
}

export class PayloadDefinitionError extends ValidFlowError {
  public errorCode: PayloadErrorCode = PayloadErrorCode.UNKNOWN;
  constructor(message: string, errorCode?: PayloadErrorCode) {
    super(message);
    this.errorCode = errorCode;
  }
}
