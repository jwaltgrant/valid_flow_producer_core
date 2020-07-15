import { combineReducers } from "redux";
import nodeStore from "../nodes/redux";
import payloadStore from "../payload/redux";
import flowTestStore, { IFlowTestState } from "../flow_test/redux";
import { createReducerSet } from "../utils/reducerSet";
import * as NodeStoreActions from "../nodes/redux/actions";
import * as PayloadStoreActions from "../payload/redux/actions";
import * as FlowTestStoreActions from "../flow_test/redux/actions";

const findItem = (items: IFlowTestState[], name: string) => {
  return items.find((i) => i.testPayload.name === name);
};

export const FlowTestStore = createReducerSet<IFlowTestState>(
  flowTestStore,
  findItem
);

export const flowStore = combineReducers({
  nodeStore,
  payloadStore,
  flowTestStore: FlowTestStore.reducer,
});

export const FlowStoreActions = {
  NodeStoreActions,
  PayloadStoreActions,
  FlowTestStoreActions,
};
