import { IOutputPair } from "../OutputDef";

export enum OUTPUT_NODE_ACTIONS {
    ADD_OUTPUT_PAIR = 'add_ouput_pair',
    REMOVE_OUTPUT_PAIR = 'remove_output_pair',
    UPDATE_OUTPUT_PAIR = 'update_output_pair'
}

export function addOutputPair(nodeID: string, outputPair: IOutputPair){
    return {
        type: OUTPUT_NODE_ACTIONS.ADD_OUTPUT_PAIR,
        nodeID,
        outputPair
    };
}

export function removeOutputPair(nodeID: string, pairKey: string){
    return {
        type: OUTPUT_NODE_ACTIONS.REMOVE_OUTPUT_PAIR,
        nodeID,
        pairKey
    };
}

export function updateOutputPair(nodeID: string, outputPair: IOutputPair){
    return {
        type: OUTPUT_NODE_ACTIONS.UPDATE_OUTPUT_PAIR,
        nodeID,
        outputPair
    };
}
