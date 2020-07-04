import { combineReducers } from "redux";
import nodeStore from '../nodes/redux';
import payloadStore from '../payload/redux';
import flowTestStore, {IFlowTestState} from '../flow_test/redux';
import {createReducerSet} from '../utils/reducerSet';


const findItem = (items: IFlowTestState[], name: string) => {
  return items.find((i) => i.testPayload.name === name);
};

export const FlowTestStore = createReducerSet<IFlowTestState>(flowTestStore, findItem);


const flowStore = combineReducers({
    nodeStore,
    payloadStore,
    flowTestStore: FlowTestStore.reducer
});

export default flowStore;
