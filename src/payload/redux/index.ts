import { PAYLOAD_ACTIONS } from "./actions";

import * as Payload from "../PayloadDefinition";

export interface IPayloadState extends Payload.IPayloadDefinition {
  invalidKey: string;
}

const initialState: IPayloadState = {
  payloadItems: [],
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
