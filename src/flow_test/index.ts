import IFieldDef from "../FieldDef";
import { IPayloadDefinition } from "../payload/PayloadDefinition";

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

export class TestPayload {
  /**
   * Initialize an set of Test Fields wiht null for thier test values
   * @param payloadDef IPayloadDefintition to initialize from
   */
  static initFromPayloadDef(
    payloadDef: IPayloadDefinition,
    name?: string
  ): ITestPayload {
    const fields: ITestField[] = payloadDef.payloadItems.map((item) => {
      return {
        ...item,
        testVal: null,
      };
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
  static initField(fieldDef: IFieldDef): ITestField {
    return {
      ...fieldDef,
      testVal: null,
    };
  }

  /**
   * Update a test field, if no field with the same name is found, add new field
   * @param fields Array of Fields to update a value on
   * @param newField Field to insert, where the name matches
   */
  static updateTestField(fields: ITestField[], newField: ITestField) {
    const index = fields.findIndex((f) => f.name === newField.name);
    if (index === -1) {
      return [...fields, newField];
    } else {
      fields.splice(index, 1, newField);
      return [...fields];
    }
  }

  /**
   * Add a new field to a list of fields, ensuring name is not duplicated
   * @param fields Array of test fields to add to
   * @param newField Field to add
   */
  static addTestField(fields: ITestField[], newField: ITestField) {
    const index = fields.findIndex((f) => f.name === newField.name);
    if (index !== -1) {
      throw new Error(`Name: ${newField.name} is taken`);
    }
    return [...fields, newField];
  }
}
