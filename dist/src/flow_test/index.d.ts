import IFieldDef from "../FieldDef";
import { IPayloadDefinition } from "../payload/PayloadDefinition";
import * as TestPayloadActions from "./redux/actions";
export { TestPayloadActions };
export interface ITestField extends IFieldDef {
    testVal: any;
}
export interface ITestPayload {
    fields: ITestField[];
    name: string;
}
export interface ITestResult {
    nodeID: string;
    result: any;
}
export declare class TestPayload {
    /**
     * Initialize an set of Test Fields wiht null for thier test values
     * @param payloadDef IPayloadDefintition to initialize from
     */
    static initFromPayloadDef(payloadDef: IPayloadDefinition, name?: string): ITestPayload;
    /**
     * Initialze a test field from a Field Def with a null value
     * @param fieldDef IFieldDef to create from
     */
    static initField(fieldDef: IFieldDef): ITestField;
    /**
     * Update a test field, if no field with the same name is found, add new field
     * @param fields Array of Fields to update a value on
     * @param newField Field to insert, where the name matches
     */
    static updateTestField(fields: ITestField[], newField: ITestField): ITestField[];
    /**
     * Add a new field to a list of fields, ensuring name is not duplicated
     * @param fields Array of test fields to add to
     * @param newField Field to add
     */
    static addTestField(fields: ITestField[], newField: ITestField): ITestField[];
}
