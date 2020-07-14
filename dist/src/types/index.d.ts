import IFieldDef from "../FieldDef";
import { IBlockImplementation } from "./BlockImplementation";
export declare enum BaseTypes {
    ANY = "any",
    NUBMER = "number",
    BOOLEAN = "boolean",
    DATE = "date",
    DATETIME = "datetime",
    STRING = "string"
}
export interface IType {
    typeName: string;
    fields: IFieldDef[];
    blocks: IBlockImplementation[];
}
