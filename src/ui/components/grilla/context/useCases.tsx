import { useReducer } from "react"
import { filterTextType, IContextState, IFilter, IGridContext, IGridFunction, IMetaDataPagination, IPagination, ISortType, ITheadGrid, signalType } from "./gridContext"
import UseGridReducer from "./useReducer"

// interface ---------------------------------------------------------------------------

type IUseGridHandler = (currentState: IContextState & { pagination?: IPagination }) => IGridContext & IGridFunction

// handler grid ---------------------------------------------------------------------------
export const useHandleGridContext: IUseGridHandler = (currentState) => {
    const initialState: IGridContext = {
        pagination: {
            page: currentState.pagination?.page ?? "1", limit: currentState.pagination?.limit ?? "20",
            filt: currentState.pagination?.filt, sort: currentState.pagination?.sort
        }, thead: currentState.thead, url: currentState.url
    }

    const [state, dispatch] = useReducer(UseGridReducer, initialState)

    const changePage = (num: number) => {
        dispatch({ type: "CHANGE_PAGE", payload: `${num}` })
    }

    const changeLimit = (num: number) => {
        dispatch({ type: "CHANGE_LIMIT", payload: `${num}` })
    }

    const setCurrentMetadaPagination = (meta: IMetaDataPagination) => {
        dispatch({ type: "SET_META_DATA", payload: meta })
    }

    const showFilterColumn = (columnParam: string) => {
        if (state.currentFilterColumnOpen === columnParam) {
            dispatch({ type: "SET_FILTER_PARAM", payload: undefined })
            return
        }
        dispatch({ type: "SET_FILTER_PARAM", payload: columnParam })
    }

    const sortByParam = (param: string, desc: boolean) => {
        const sort = state.pagination?.sort
        const currentIndex = sort?.findIndex(item => item.selector === param)

        // delete sort value if the column has been filtered
        if (sort && currentIndex !== undefined && currentIndex >= 0) {
            let newSort = [...sort]

            if (newSort[currentIndex].desc === desc) {
                newSort.splice(currentIndex, 1)
            } else {
                newSort[currentIndex] = { selector: param, desc: desc }
            }

            dispatch({ type: "SET_SORT", payload: newSort.length > 0 ? newSort : undefined })
            return
        }

        const newSort = { desc, selector: param } as ISortType
        dispatch({ type: "SET_SORT", payload: [...sort ?? [], newSort] })
    }

    const setTheadHiddenValue = (column: ITheadGrid, value: boolean) => {
        let currentThead = [...state.thead] as ITheadGrid[]
        let indexColumn = currentThead.findIndex((th) => th.param === column.param)

        // delete filters from the column hidden
        if (value) {
            const filt = state.pagination?.filt
            const newFilt = filt?.filter((filter) => filter.param !== column.param)
            dispatch({ type: "SET_FILTER", payload: newFilt })
        }

        currentThead[indexColumn] = { ...column, hiddeColumn: value }
        dispatch({ type: "SET_THEAD", payload: currentThead })
    }


    const simpleSetFilter = (param: string, signal: signalType, type: filterTextType, value?: string | number) => {
        const filt = state.pagination?.filt
        const newFilter: IFilter = { param, signal, value, type }

        // delete all the filters with the same param
        if (filt) {
            let currentFilt = [...filt].filter((filt) => filt.param !== param)
            Boolean(value) && currentFilt.push(newFilter)

            const newFilt = currentFilt.length > 0 ? currentFilt : undefined
            dispatch({ type: "SET_FILTER", payload: newFilt })
            return
        }

        Boolean(value) && dispatch({ type: "SET_FILTER", payload: [newFilter] })
    }

    const intervalSetFilter = (newFilters: IFilter[]) => {
        const filt = state.pagination?.filt
        const currentParam = newFilters.map((filt) => filt.param)
        const cleanNewFilter = newFilters.filter((filt) => Boolean(filt.value))

        // delete all the filters with the same param
        if (filt) {
            let currentFilt = [...filt].filter((filt) => !currentParam.includes(filt.param))
            currentFilt = [...currentFilt, ...cleanNewFilter]

            const newFilt = currentFilt.length > 0 ? currentFilt : undefined
            dispatch({ type: "SET_FILTER", payload: newFilt })
            return
        }

        const newFilt = cleanNewFilter.length > 0 ? cleanNewFilter : undefined
        dispatch({ type: "SET_FILTER", payload: newFilt })
    }

    const changeAsideColumnValue = () => {
        dispatch({ type: "SET_ASIDE_COLUMN" })
    }

    const setRowToExpand = (rowExpanded: string) => {
        state.rowExpanded !== rowExpanded ? dispatch({ type: "SET_ROW_EXPANDED", payload: rowExpanded }) : dispatch({ type: "SET_ROW_EXPANDED", payload: undefined })
    }

    return {
        pagination: state.pagination, paramActionsActive: state.paramActionsActive, rowExpanded: state.rowExpanded, showAsideColumnHandler: state.showAsideColumnHandler,
        thead: state.thead, url: state.url, currentFilterColumnOpen: state.currentFilterColumnOpen, metaDataPagination: state.metaDataPagination,
        changePage, changeLimit, showFilterColumn, sortByParam, setRowToExpand, setCurrentMetadaPagination,
        simpleSetFilter, changeAsideColumnValue, intervalSetFilter, setTheadHiddenValue
    }
}