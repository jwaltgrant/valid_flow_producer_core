import { PAYLOAD_ACTIONS } from "./actions";

import * as Payload from "../PayloadDefinition";

export interface IPayloadState extends Payload.IPayloadDefinition {
  invalidKey: string;
}

const initialState: IPayloadState = {
  payloadItems: [],
  dynamicKeys: [],
  invalidKey: "",
};

export default function payloadState(
  state = initialState,
  action: any
): IPayloadState {
  switch (action.type) {
    case PAYLOAD_ACTIONS.ADD_ITEM:
      try {
        return {
          ...state,
          ...Payload.addPayloadItem(state, action.item),
        };
      } catch {
        return {
          ...state,
          invalidKey: action.item.name,
        };
      }
    case PAYLOAD_ACTIONS.ADD_DYANMIC_KEY:
      try {
        return { ...state, ...Payload.addDynamicKey(state, action.dynamicKey) };
      } catch {
        return {
          ...state,
          invalidKey: action.dynamicKey.name,
        };
      }
    case PAYLOAD_ACTIONS.REPLACE_ITEM:
      const item = state.payloadItems.find((i) => i.name === action.oldName);
      if (!item) {
        return {
          ...state,
          payloadItems: [...state.payloadItems, action.newItem],
        };
      }
      const index = state.payloadItems.indexOf(item);
      state.payloadItems.splice(index, 1, action.newItem);
      return {
        ...state,
        payloadItems: [...state.payloadItems],
      };
    case PAYLOAD_ACTIONS.REMOVE_ITEM:
    case PAYLOAD_ACTIONS.REMOVE_DYNAMIC_KEY:
      return { ...state, ...Payload.removeItem(state, action.name) };
    case PAYLOAD_ACTIONS.CHANGE_KEY:
      break;
    case PAYLOAD_ACTIONS.CHANGE_TYPE:
      break;
    case PAYLOAD_ACTIONS.CLEAR:
      return initialState;
    default:
      return state;
  }
}
