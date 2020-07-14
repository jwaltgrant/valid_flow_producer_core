export interface IArgInstance {
  name: string;
  value: any;
  payloadElement: boolean;
}

export default class ArgInstance implements IArgInstance {
  name: string;
  value: any;
  payloadElement: boolean;

  constructor(name?: string, value?: any, payloadElement?: boolean) {
    this.name = name;
    this.value = value;
    this.payloadElement = payloadElement || false;
  }
}
