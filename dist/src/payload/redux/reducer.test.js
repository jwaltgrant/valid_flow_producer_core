import reducer from "./";
import * as PayloadActions from "./actions";
describe("Payload Reducer Tests", () => {
    let state = {
        payloadItems: [],
        invalidKey: "",
    };
    const pItem1 = { name: "name", type: "any" };
    const pItem2 = { name: "name2", type: "string" };
    test("Return Initial State", () => {
        expect(reducer(undefined, {})).toEqual(state);
    });
    test("Add Item", () => {
        state = reducer(state, PayloadActions.addItem(pItem1));
        expect(state).toEqual({
            payloadItems: [pItem1],
            invalidKey: "",
        });
        state = reducer(state, PayloadActions.addItem(pItem2));
        expect(state).toEqual({
            payloadItems: [pItem1, pItem2],
            invalidKey: "",
        });
    });
    test("Remove Item", () => {
        state = reducer(state, PayloadActions.removeItem(pItem1.name));
        expect(state).toEqual({
            payloadItems: [pItem2],
            invalidKey: "",
        });
    });
    test("Invalid Key", () => {
        const item = { name: "name2", type: "any" };
        state = reducer(state, PayloadActions.addItem(item));
        expect(state).toEqual({
            payloadItems: [pItem2],
            invalidKey: item.name,
        });
    });
});
