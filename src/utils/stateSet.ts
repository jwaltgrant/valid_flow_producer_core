export enum StateSetActions {
    ADD_ITEM = 'state_set_add_i',
    REMOVE_ITEM = 'state_set_rm_i',
    ACTIVATE_ITEM = 'state_set_activate_i'
}

export function addItem(item: any){
    return {
        type: StateSetActions.ADD_ITEM,
        item
    }
}

export function removeItem(itemKey: string | number){
    return {
        type: StateSetActions.REMOVE_ITEM,
        itemKey
    }
}

export function activateItem(itemKey: string | number){
    return {
        type: StateSetActions.ACTIVATE_ITEM,
        itemKey
    }
}


export function createStateSet<T>(
  singleReducer: (state: T, action: any) => T,
  findItem: (items: T[], key: any) => T
): (state: IsetReducer<T>, action: any) => any{
    const useSet = (action: any) => {
        const t = action.type;
        return (!!Object.values(StateSetActions).find((i) => i === t));
    }
    const reducer = (state: IsetReducer<T> = initialState, action: any) => {
        if(useSet(action)){
            return setReducer(state, action, findItem);
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
    return reducer;
}


export interface IsetReducer<T>{
    activeItemKey: string | number;
    items: T[]
}

const initialState: IsetReducer<any> = {
    activeItemKey: null,
    items: []
}

function setReducer<T>(
  state: IsetReducer<T> = initialState,
  action: any,
  findItem: (items: T[], key: any) => T
) {
  let index;
  let item;
  switch (action.type) {
    case StateSetActions.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.item],
      };
    case StateSetActions.REMOVE_ITEM:
      item = findItem(state.items, state.activeItemKey);
      if(!item){
        return state;
      }
      index = state.items.indexOf(item);
      state.items.splice(index, 1);
      const items = [...state.items];
      const activeItemKey =
        action.itemKey === state.activeItemKey ? null : state.activeItemKey;
      return {
        ...state,
        activeItemKey,
        items,
      };
    case StateSetActions.ACTIVATE_ITEM:
        item = findItem(state.items, action.itemKey);
        if (!item) {
            throw new Error('Item not found')
        }
        index = state.items.indexOf(item);
      return {
        ...state,
        activeItemKey: action.itemKey,
      };
  }
  return state;
}
