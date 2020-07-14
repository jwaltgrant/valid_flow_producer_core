import { IOutputPair } from "../OutputDef";
export declare enum OUTPUT_NODE_ACTIONS {
    ADD_OUTPUT_PAIR = "add_ouput_pair",
    REMOVE_OUTPUT_PAIR = "remove_output_pair",
    UPDATE_OUTPUT_PAIR = "update_output_pair"
}
export declare function addOutputPair(nodeID: string, outputPair: IOutputPair): {
    type: OUTPUT_NODE_ACTIONS;
    nodeID: string;
    outputPair: IOutputPair;
};
export declare function removeOutputPair(nodeID: string, pairKey: string): {
    type: OUTPUT_NODE_ACTIONS;
    nodeID: string;
    pairKey: string;
};
export declare function updateOutputPair(nodeID: string, outputPair: IOutputPair): {
    type: OUTPUT_NODE_ACTIONS;
    nodeID: string;
    outputPair: IOutputPair;
};
