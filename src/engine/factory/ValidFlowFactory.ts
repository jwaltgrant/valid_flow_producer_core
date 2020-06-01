export default interface IValidFlowFactory<T> {
  factoryMatch: (data: any) => boolean;
  create: (data: any) => T;
}
