export var StateSetActions;
(function (StateSetActions) {
    StateSetActions["ADD_ITEM"] = "state_set_add_i";
    StateSetActions["REMOVE_ITEM"] = "state_set_rm_i";
    StateSetActions["ACTIVATE_ITEM"] = "state_set_activate_i";
})(StateSetActions || (StateSetActions = {}));
const keySingleton = (function () {
    let key = 0;
    return {
        nextKey: () => {
            const ret = `${key}`;
            key += 1;
            return ret;
        }
    };
})();
export function createStateSet(singleReducer, findItem) {
    const key = keySingleton.nextKey();
    const activateItem = (itemKey) => {
        return {
            type: `${StateSetActions.ACTIVATE_ITEM}_${key}`,
            itemKey
        };
    };
    const addItem = (item) => {
        return {
            type: `${StateSetActions.ADD_ITEM}_${key}`,
            item
        };
    };
    const removeItem = (itemKey) => {
        return {
            type: `${StateSetActions.REMOVE_ITEM}_${key}`,
            itemKey
        };
    };
    const shouldUseSet = (action) => {
        const t = action.type;
        return (!!Object.values(StateSetActions).find((i) => `${i}_${key}` === t));
    };
    const initialState = {
        activeItemKey: null,
        items: [],
    };
    const setReducer = (state, action) => {
        let index;
        let item;
        switch (action.type) {
            case `${StateSetActions.ADD_ITEM}_${key}`:
                return Object.assign(Object.assign({}, state), { items: [...state.items, action.item] });
            case `${StateSetActions.REMOVE_ITEM}_${key}`:
                item = findItem(state.items, state.activeItemKey);
                if (!item) {
                    return state;
                }
                index = state.items.indexOf(item);
                state.items.splice(index, 1);
                const items = [...state.items];
                const activeItemKey = action.itemKey === state.activeItemKey
                    ? null
                    : state.activeItemKey;
                return Object.assign(Object.assign({}, state), { activeItemKey,
                    items });
            case `${StateSetActions.ACTIVATE_ITEM}_${key}`:
                item = findItem(state.items, action.itemKey);
                if (!item) {
                    throw new Error("Item not found");
                }
                index = state.items.indexOf(item);
                return Object.assign(Object.assign({}, state), { activeItemKey: action.itemKey });
        }
        return state;
    };
    const reducer = (state = initialState, action) => {
        if (shouldUseSet(action)) {
            return setReducer(state, action);
        }
        else {
            const activeItem = findItem(state.items, state.activeItemKey);
            if (!activeItem) {
                return state;
            }
            const activeIndex = state.items.indexOf(activeItem);
            const updated = singleReducer(state.items[activeIndex], action);
            state.items.splice(activeIndex, 1, updated);
            return Object.assign(Object.assign({}, state), { items: [...state.items] });
        }
    };
    return { reducer, addItem, removeItem, activateItem };
}
