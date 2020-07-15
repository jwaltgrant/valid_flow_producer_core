import * as TestPayloadActions from "./redux/actions";
export { TestPayloadActions };
export class TestPayload {
    /**
     * Initialize an set of Test Fields wiht null for thier test values
     * @param payloadDef IPayloadDefintition to initialize from
     */
    static initFromPayloadDef(payloadDef, name) {
        const fields = payloadDef.payloadItems.map((item) => {
            return Object.assign(Object.assign({}, item), { testVal: null });
        });
        return {
            fields,
            name,
        };
    }
    /**
     * Initialze a test field from a Field Def with a null value
     * @param fieldDef IFieldDef to create from
     */
    static initField(fieldDef) {
        return Object.assign(Object.assign({}, fieldDef), { testVal: null });
    }
    /**
     * Update a test field, if no field with the same name is found, add new field
     * @param fields Array of Fields to update a value on
     * @param newField Field to insert, where the name matches
     */
    static updateTestField(fields, newField) {
        const index = fields.findIndex((f) => f.name === newField.name);
        if (index === -1) {
            return [...fields, newField];
        }
        else {
            fields.splice(index, 1, newField);
            return [...fields];
        }
    }
    /**
     * Add a new field to a list of fields, ensuring name is not duplicated
     * @param fields Array of test fields to add to
     * @param newField Field to add
     */
    static addTestField(fields, newField) {
        const index = fields.findIndex((f) => f.name === newField.name);
        if (index !== -1) {
            throw new Error(`Name: ${newField.name} is taken`);
        }
        return [...fields, newField];
    }
}
