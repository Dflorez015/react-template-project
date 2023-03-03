import { useReducer } from "react"
import { filterTextType, IContextState, IFilter, IGridContext, ISortType, ITheadGrid, signalType } from "./gridContext"
import UseGridReducer from "./useReducer"

export const useHandleGridContext = (currentState: IContextState) => {
    const initialState: IGridContext = { pagination: { page: "1", limit: "20" }, ...currentState }

    const [state, dispatch] = useReducer(UseGridReducer, initialState)

    const changePage = (num: number) => {
        dispatch({ type: "CHANGE_PAGE", payload: `${num}` })
    }

    const changeLimit = (num: number) => {
        dispatch({ type: "CHANGE_LIMIT", payload: `${num}` })
    }

    const showFilterColumn = (columnParam: string) => {
        if (state.currentFilterColumnOpen === columnParam) {
            dispatch({ type: "SET_FILTER_PARAM", payload: undefined })
            return
        }
        dispatch({ type: "SET_FILTER_PARAM", payload: columnParam })
        return
    }

    const sortByParam = (param: string, desc: boolean) => {
        const sort = state.pagination?.sort as ISortType | undefined

        // delete sort value if the column has been filtered
        if ((sort) && (sort.selector === param) && (sort.desc === desc)) {
            dispatch({ type: "SET_SORT", payload: undefined })
            return
        }

        const newSort = { desc, selector: param } as ISortType
        dispatch({ type: "SET_SORT", payload: newSort })
        return
    }

    const setTheadHiddenValue = (column: ITheadGrid, value: boolean) => {
        let currentThead = [...state.thead] as ITheadGrid[]
        let indexColumn = currentThead.findIndex((th) => th.param === column.param)

        // delete filters from the column hidden
        if (value) {
            const filt = state.pagination?.filt as IFilter[] | undefined
            const newFilt = filt?.filter((filter) => filter.param !== column.param)
            dispatch({ type: "SET_FILTER", payload: newFilt })
        }

        currentThead[indexColumn] = { ...column, hiddeColumn: value }
        dispatch({ type: "SET_THEAD", payload: currentThead })
    }


    const simpleSetFilter = (param: string, signal: signalType, type: filterTextType, value?: string | number) => {
        const filt = state.pagination?.filt as IFilter[] | undefined
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
        return
    }

    const intervalSetFilter = (newFilters: IFilter[]) => {
        const filt = state.pagination?.filt as IFilter[] | undefined
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
        return
    }

    const changeAsideColumnValue = () => {
        dispatch({ type: "SET_ASIDE_COLUMN" })
    }

    const setRowToExpand = (rowExpanded: string) => {
        state.rowExpanded !== rowExpanded ? dispatch({ type: "SET_ROW_EXPANDED", payload: rowExpanded }) : dispatch({ type: "SET_ROW_EXPANDED", payload: undefined })
    }

    return {
        state, changePage, changeLimit, showFilterColumn, sortByParam, setRowToExpand,
        simpleSetFilter, changeAsideColumnValue, intervalSetFilter, setTheadHiddenValue
    }
}