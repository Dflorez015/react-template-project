import { useReducer } from "react"
import { filterTextType, IContextState, IFilter, IGridContext, ISortType, signalType } from "./gridContext"
import UseGridReducer from "./useReducer"

export const useHandleGridContext = (currentState: IContextState) => {
    const initialState: IGridContext = { ...currentState }

    const [state, dispatch] = useReducer(UseGridReducer, initialState)

    const changePage = (num: number) => {
        dispatch({ type: "CHANGE_PAGE", payload: num })
    }

    const changeLimit = (num: number) => {
        dispatch({ type: "CHANGE_LIMIT", payload: num })
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

        if ((sort) && (sort.selector === param) && (sort.desc === desc)) {
            dispatch({ type: "SET_SORT", payload: undefined })
            return
        }

        dispatch({ type: "SET_SORT", payload: { desc, selector: param } as ISortType })
        return
    }

    const simpleSetFilter = (param: string, signal: signalType, type: filterTextType, value?: string | number) => {
        const filt = state.pagination?.filt as IFilter[] | undefined
        const newFilter: IFilter = { param, signal, value, type }

        if (filt) {
            let currentFilt = [...filt].filter((filt) => filt.param !== param)
            Boolean(value) && currentFilt.push(newFilter)
            dispatch({ type: "SET_FILTER", payload: currentFilt.length > 0 ? currentFilt : undefined })
            return
        }

        Boolean(value) && dispatch({ type: "SET_FILTER", payload: [newFilter] })
        return
    }

    const intervalSetFilter = (newFilters: IFilter[]) => {
        const filt = state.pagination?.filt as IFilter[] | undefined
        const currentParam = newFilters[0].param
        const cleanNewFilter = newFilters.filter((filt) => Boolean(filt.value))

        if (filt) {
            let currentFilt = [...filt].filter((filt) => filt.param !== currentParam)
            currentFilt = [...currentFilt, ...cleanNewFilter]
            dispatch({ type: "SET_FILTER", payload: currentFilt.length > 0 ? currentFilt : undefined })
            return
        }

        dispatch({ type: "SET_FILTER", payload: cleanNewFilter.length > 0 ? cleanNewFilter : undefined })
        return
    }

    return { state, changePage, changeLimit, showFilterColumn, sortByParam, simpleSetFilter, intervalSetFilter }
}