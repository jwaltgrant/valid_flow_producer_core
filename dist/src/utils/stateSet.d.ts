export declare enum StateSetActions {
    ADD_ITEM = "state_set_add_i",
    REMOVE_ITEM = "state_set_rm_i",
    ACTIVATE_ITEM = "state_set_activate_i"
}
export interface ISetReducer<T> {
    activeItemKey: any;
    items: T[];
}
export interface ICreateStateSetRet<T> {
    reducer: (state: ISetReducer<T>, action: any) => ISetReducer<T>;
    addItem: (item: T) => any;
    removeItem: (itemKey: any) => any;
    activateItem: (itemKey: any) => any;
}
export declare function createStateSet<T>(singleReducer: (state: T, action: any) => T, findItem: (items: T[], key: any) => T): ICreateStateSetRet<T>;
