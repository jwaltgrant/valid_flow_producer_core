import { combineReducers } from "redux";
import nodeStore from "../nodes/redux";
import payloadStore, { IPayloadState } from "../payload/redux";
import flowTestStore, { IFlowTestState } from "../flow_test/redux";
import { createReducerSet, IReducerSetState } from "../utils/reducerSet";
import * as NodeStoreActions from "../nodes/redux/actions";
import * as PayloadStoreActions from "../payload/redux/actions";
import * as FlowTestStoreActions from "../flow_test/redux/actions";
import { IAbstractNode } from "../nodes";

const findItem = (items: IFlowTestState[], name: string) => {
  return items.find((i) => i.testPayload.name === name);
};

export const FlowTestStore = createReducerSet<IFlowTestState>(
  flowTestStore,
  findItem
);

export interface IFlowStoreState {
  nodeStore: IAbstractNode[];
  payloadStore: IPayloadState;
  flowTestStore: IReducerSetState<IFlowTestState>;
}

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
