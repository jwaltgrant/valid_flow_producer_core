import { PAYLOAD_ACTIONS } from "./actions";
import * as Payload from "../PayloadDefinition";
const initialState = {
    payloadItems: [],
    invalidKey: "",
};
export default function payloadState(state = initialState, action) {
    switch (action.type) {
        case PAYLOAD_ACTIONS.ADD_ITEM:
            try {
                return Object.assign(Object.assign({}, state), Payload.addPayloadItem(state, action.item));
            }
            catch (_a) {
                return Object.assign(Object.assign({}, state), { invalidKey: action.item.name });
            }
        case PAYLOAD_ACTIONS.REPLACE_ITEM:
            const item = state.payloadItems.find((i) => i.name === action.oldName);
            if (!item) {
                return Object.assign(Object.assign({}, state), { payloadItems: [...state.payloadItems, action.newItem] });
            }
            const index = state.payloadItems.indexOf(item);
            state.payloadItems.splice(index, 1, action.newItem);
            return Object.assign(Object.assign({}, state), { payloadItems: [...state.payloadItems] });
        case PAYLOAD_ACTIONS.REMOVE_ITEM:
            return Object.assign(Object.assign({}, state), Payload.removeItem(state, action.name));
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
