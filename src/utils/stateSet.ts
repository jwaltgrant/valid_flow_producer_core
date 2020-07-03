export enum StateSetActions {
    ADD_ITEM = 'state_set_add_i',
    REMOVE_ITEM = 'state_set_rm_i',
    ACTIVATE_ITEM = 'state_set_activate_i'
}


export interface IsetReducer<T> {
  activeItemKey: string | number;
  items: T[];
}

const keySingleton = (function() {
    let key: number = 0;
    return{
        nextKey: () => {
            const ret = `${key}`;
            key += 1;
            return ret;
        }
    }
})();

export interface ICreateStateSetRet<T>{
    reducer: (state: IsetReducer<T>, action: any) => IsetReducer<T>;
    addItem: (item: T) => any;
    removeItem: (itemKey: any) => any;
    activateItem: (itemKey: any) => any;
}

export function createStateSet<T>(
  singleReducer: (state: T, action: any) => T,
  findItem: (items: T[], key: any) => T
): ICreateStateSetRet<T>{
    const key = keySingleton.nextKey();

    const activateItem = (itemKey: any) => {
        return {
            type: `${StateSetActions.ACTIVATE_ITEM}_${key}`,
            itemKey
        };
    }

    const addItem = (item: T) => {
        return {
            type: `${StateSetActions.ADD_ITEM}_${key}`,
            item
        };
    }

    const removeItem = (itemKey: any) => {
        return {
            type: `${StateSetActions.REMOVE_ITEM}_${key}`,
            itemKey
        }
    }


    const useSet = (action: any) => {
        const t = action.type;
        return (!!Object.values(StateSetActions).find((i) => `${i}_${key}` === t));
    }
    const initialState: IsetReducer<any> = {
      activeItemKey: null,
      items: [],
    };
    const setReducer = (state: IsetReducer<T>, action: any) => {
        let index;
        let item;
        switch (action.type) {
          case `${StateSetActions.ADD_ITEM}_${key}`:
            return {
              ...state,
              items: [...state.items, action.item],
            };
          case `${StateSetActions.REMOVE_ITEM}_${key}`:
            item = findItem(state.items, state.activeItemKey);
            if (!item) {
              return state;
            }
            index = state.items.indexOf(item);
            state.items.splice(index, 1);
            const items = [...state.items];
            const activeItemKey =
              action.itemKey === state.activeItemKey
                ? null
                : state.activeItemKey;
            return {
              ...state,
              activeItemKey,
              items,
            };
          case `${StateSetActions.ACTIVATE_ITEM}_${key}`:
            item = findItem(state.items, action.itemKey);
            if (!item) {
              throw new Error("Item not found");
            }
            index = state.items.indexOf(item);
            return {
              ...state,
              activeItemKey: action.itemKey,
            };
        }
        return state;
    }
    const reducer = (state: IsetReducer<T> = initialState, action: any) => {
        if(useSet(action)){
            return setReducer(state, action);
        } else{
            const activeItem = findItem(state.items, state.activeItemKey);
            if (!activeItem) {
              return state;
            }
            const activeIndex = state.items.indexOf(activeItem);
            const updated = singleReducer(state.items[activeIndex], action);
            state.items.splice(activeIndex, 1, updated);
            return {
                ...state,
                items: [...state.items]
            }
        }
    }
    return {reducer, addItem, removeItem, activateItem};
}
