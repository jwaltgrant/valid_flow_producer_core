import IValidFlowFactory from './factory/ValidFlowFactory';

export enum RegistryTypes {
    NODE = 'node',
    BLOCK_INSTANCE = 'block'
}

export default class ValidFlowRegistry<T>{
    factories: IValidFlowFactory<T>[];

    addFactory(factory: IValidFlowFactory<T>){
        this.factories.push(factory);
    }

    create(data: any): T {
        const factory = this.factories.find((factory) => factory.factoryMatch(data));
        if(factory){
            return factory.create(data);
        }
        return null;
    }
}