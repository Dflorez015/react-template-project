import { IFilter, IGridContext } from "./gridContext";

export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const SET_FILTER_PARAM = "SET_FILTER_PARAM";
export const SET_SORT = "SET_SORT";
export const SET_FILTER = "SET_FILTER";

export default (state: IGridContext, action: { payload: any, type: string }) => {
    const { payload, type } = action;

    switch (type) {
        case CHANGE_PAGE:
            return {
                ...state,
                pagination: { ...state.pagination, page: payload },
            };
        case CHANGE_LIMIT:
            return {
                ...state,
                pagination: { ...state.pagination, limit: payload },
            };
        case SET_FILTER_PARAM:
            return {
                ...state,
                currentFilterColumnOpen: payload,
            };
        case SET_SORT:
            return {
                ...state,
                pagination: { ...state.pagination, sort: payload },
            };
        case SET_FILTER:
            return {
                ...state,
                pagination: { ...state.pagination, filt: payload},
            };

        default:
            return state;
    }
};