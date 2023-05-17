import { IGridContext } from "./gridContext";
import produce from "immer";

const CHANGE_PAGE = "CHANGE_PAGE";
const CHANGE_LIMIT = "CHANGE_LIMIT";
const SET_FILTER_PARAM = "SET_FILTER_PARAM";
const SET_SORT = "SET_SORT";
const SET_FILTER = "SET_FILTER";
const SET_ASIDE_COLUMN = "SET_ASIDE_COLUMN";
const SET_THEAD = "SET_THEAD";
const SET_ROW_EXPANDED = "SET_ROW_EXPANDED";
const SET_META_DATA = "SET_META_DATA";

export default (state: IGridContext, action: { payload?: any, type: string }) => {
    const { payload, type } = action;

    switch (type) {
        case CHANGE_PAGE:
            return produce(state, (draft) => {                
                draft.pagination!.page = payload
            })
        case CHANGE_LIMIT:
            return produce(state, (draft) => {
                draft.pagination!.limit = payload
            })
        case SET_FILTER_PARAM:
            return produce(state, (draft) => {
                draft.currentFilterColumnOpen = payload
            })
        case SET_SORT:
            return produce(state, (draft) => {
                draft.pagination!.sort = payload
            })
        case SET_THEAD:
            return produce(state, (draft) => {
                draft.thead = payload
            })
        case SET_FILTER:
            return produce(state, (draft) => {
                draft.pagination!.filt = payload
            })
        case SET_ASIDE_COLUMN:
            return produce(state, (draft) => {
                draft.showAsideColumnHandler = !(state.showAsideColumnHandler)
            })
        case SET_ROW_EXPANDED:
            return produce(state, (draft) => {
                draft.rowExpanded = payload
            })
        case SET_META_DATA:
            return produce(state, (draft) => {
                draft.metaDataPagination = payload
            })

        default:
            return state;
    }
};

// export default (state: IGridContext, action: Partial<IGridContext>) => {
//     return produce(state, (draft) => {
//         draft = { ...draft, ...action }
//     })
// };