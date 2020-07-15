import { allNodes, childNodes } from "../nodes/AbstractNode.test";
import * as Payload from "./PayloadDefinition";
const fields = [
    {
        name: "field1",
        type: "string",
    },
    {
        name: "field2",
        type: "number",
    },
    {
        name: "field3",
        type: "any",
    },
];
const payloadDef = {
    payloadItems: fields,
};
test("Find Payload Item", () => {
    let item = Payload.findPayloadItem(payloadDef, "field1");
    expect(item).toEqual(fields[0]);
    item = Payload.findPayloadItem(payloadDef, "null");
    expect(item).toBeUndefined();
    item = Payload.findPayloadItem(payloadDef, "dField1");
    expect(item).toBeUndefined();
});
test("Has Item", () => {
    let item = Payload.hasItem(payloadDef, "null");
    expect(item).toBeFalsy();
    item = Payload.hasItem(payloadDef, "field1");
    expect(item).toBeTruthy();
});
test("Add Payload Item", () => {
    const newItem = {
        name: "fieldX",
        type: "any",
    };
    const expected = [...fields, newItem];
    const updated = Payload.addPayloadItem(payloadDef, newItem);
    expect(expected).toEqual(updated.payloadItems);
    expect(expected.length).toEqual(fields.length + 1);
});
test("Key already in use", () => {
    const item = {
        name: fields[0].name,
        type: "any",
    };
    expect(() => {
        Payload.addPayloadItem(payloadDef, item);
    }).toThrow();
});
test("Remove Item", () => {
    let name = fields[0].name;
    let expected = [...fields];
    expected.splice(0, 1);
    expect(Payload.removeItem(payloadDef, name).payloadItems).toEqual(expected);
});
test("Get Availalbe Payload Items", () => {
    let availalbe = Payload.getAvailablePayloadItems(payloadDef, childNodes[1], allNodes);
    let expected = fields;
    expect(availalbe).toEqual(expected);
    availalbe = Payload.getAvailablePayloadItems(payloadDef, childNodes[2], allNodes);
});
