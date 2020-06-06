import PayloadDefinition from './PayloadDefinition';
import IFieldDef from '../FieldDef';

export interface ITestPayloadItem extends IFieldDef{
    value: any;
}

export class TestPayloadItem implements ITestPayloadItem{
    name: string;
    type: string;
    value: any;

    constructor(payloadItem: IFieldDef, value?: any){
        this.name = payloadItem.name;
        this.type = payloadItem.type;
        if(value){
            this.value = value;
        }
    }

    /**
     * Set the value for this test item
     * @param value Value to set
     */
    public setValue(value: any){
        this.value = value;
    }
}

export default class TestPayload{
    testName: string;
    testItems: TestPayloadItem[];
    payloadDefinition: PayloadDefinition;
    constructor(payloadDefinition: PayloadDefinition, testItems?: ITestPayloadItem[]){
        this.payloadDefinition = payloadDefinition;
        if(testItems){
            this.testItems = testItems.map((item) => {
                return new TestPayloadItem(item, item.value);
            });
        }
        else{
            this.testItems = payloadDefinition.payloadItems.map((item) => {
                return new TestPayloadItem(item);
            });
        }
    }
}