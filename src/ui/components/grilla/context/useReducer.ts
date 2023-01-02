import { IGridContext } from "./gridContext";

const CHANGE_PAGE = "CHANGE_PAGE";
const CHANGE_LIMIT = "CHANGE_LIMIT";
const SET_FILTER_PARAM = "SET_FILTER_PARAM";
const SET_SORT = "SET_SORT";
const SET_FILTER = "SET_FILTER";
const SET_ASIDE_COLUMN = "SET_ASIDE_COLUMN";

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
                pagination: { ...state.pagination, filt: payload },
            };

        case SET_ASIDE_COLUMN:
            return {
                ...state,
                showAsideColumnHandler: !Boolean(state.showAsideColumnHandler),                
            }

        default:
            return state;
    }
};