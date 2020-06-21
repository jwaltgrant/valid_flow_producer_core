import {allNodes, childNodes} from '../nodes/AbstractNode.test';
import * as Payload from './PayloadDefinition';
import IFieldDef from '../FieldDef';
import IDynamicKey from './DynamicKey';

const fields: IFieldDef[] = [
    {
        name: "field1",
        type: "string"
    },
    {
        name: "field2",
        type: "number"
    },
    {
        name: "field3",
        type: "any"
    }
]

const dynamic: IDynamicKey[] = [
  {
    name: "dField1",
    type: "number",
    nodeID: childNodes[0].id, //2
  },
  {
    name: "dField2",
    type: "string",
    nodeID: childNodes[1].id, //3
  },
  {
    name: "dField3",
    type: "any",
    nodeID: childNodes[2].id, //4
  },
  {
    name: "dField4",
    type: "any",
    nodeID: childNodes[3].id, //5
  },
];

const payloadDef: Payload.IPayloadDefinition = {
  payloadItems: fields,
  dynamicKeys: dynamic,
};

test('Find Payload Item', () => {
    let item = Payload.findPayloadItem(payloadDef, 'field1');
    expect(item).toEqual(fields[0]);
    item = Payload.findPayloadItem(payloadDef, 'null');
    expect(item).toBeUndefined();
    item = Payload.findPayloadItem(payloadDef, "dField1");
    expect(item).toBeUndefined();
});

test('Find Dynamic Key', () => {
    let item = Payload.findDynamicKey(payloadDef, "dField1");
    expect(item).toEqual(dynamic[0]);
    item = Payload.findDynamicKey(payloadDef, "null");
    expect(item).toBeUndefined();
    item = Payload.findDynamicKey(payloadDef, "field1");
    expect(item).toBeUndefined();
});

test('Has Item', () => {
    let item = Payload.hasItem(payloadDef, "dField1");
    expect(item).toBeTruthy();
    item = Payload.hasItem(payloadDef, "null");
    expect(item).toBeFalsy();
    item = Payload.hasItem(payloadDef, "field1");
    expect(item).toBeTruthy();
});

test('Add Payload Item', () => {
    const newItem: IFieldDef = {
        name: "fieldX",
        type: "any"
    }
    const expected = [...fields, newItem];
    const updated = Payload.addPayloadItem(payloadDef, newItem);
    expect(expected).toEqual(updated.payloadItems);
    expect(expected.length).toEqual(fields.length + 1);
});

test('Add Dyamic Key', () => {
    const newItem: IDynamicKey = {
        name: 'fieldX',
        type: 'any',
        nodeID: '100'
    };
    const expected = [... dynamic, newItem];
    const updated = Payload.addDynamicKey(payloadDef, newItem);
    expect(expected).toEqual(updated.dynamicKeys);
    expect(expected.length).toEqual(dynamic.length + 1);
});

test('Key already in use', () => {
    const item: IFieldDef = {
        name: fields[0].name,
        type: 'any'
    };
    expect(() => {
        Payload.addPayloadItem(payloadDef, item);
    }).toThrow();
});

test('Remove Item', () => {
    let name: string = fields[0].name;
    let expected = [...fields];
    expected.splice(0,1);
    expect(Payload.removeItem(payloadDef, name).payloadItems).toEqual(expected);
    name = dynamic[dynamic.length - 1].name;
    expected = [...dynamic];
    expected.splice(dynamic.length - 1, 1);
    expect(Payload.removeItem(payloadDef, name).dynamicKeys).toEqual(expected);
});

test('Get Availalbe Payload Items', () => {
    let availalbe = Payload.getAvailablePayloadItems(payloadDef, childNodes[1], allNodes);
    let expected = fields;
    expect(availalbe).toEqual(expected);
    availalbe = Payload.getAvailablePayloadItems(payloadDef, childNodes[2], allNodes);
    expected.push(dynamic[0]); //Set by Node ID 2
    expect(availalbe).toEqual(expected);
});
