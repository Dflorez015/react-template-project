import { useReducer } from "react"
import { filterTextType, IContextState, IFilter, IGridContext, ISortType, ITheadGrid, signalType } from "./gridContext"
import UseGridReducer from "./useReducer"

export const useHandleGridContext = (currentState: IContextState) => {
    const initialState: IGridContext = { ...currentState }

    const [state, dispatch] = useReducer(UseGridReducer, initialState)

    const changePage = (num: number) => {
        const pagination = { ...state.pagination, page: `${num}` }
        dispatch({ pagination })
    }

    const changeLimit = (num: number) => {
        const pagination = { ...state.pagination, limit: `${num}` }
        dispatch({ pagination })
    }

    const showFilterColumn = (columnParam: string) => {
        if (state.currentFilterColumnOpen === columnParam) {
            dispatch({ currentFilterColumnOpen: undefined })
            return
        }
        dispatch({ currentFilterColumnOpen: columnParam })
        return
    }

    const setTheadHiddenValue = (column: ITheadGrid, value: boolean) => {
        let currentThead = [...state.thead] as ITheadGrid[]
        let indexColumn = currentThead.findIndex((th) => th.param === column.param)

        // delete filters from the column hidden
        if (value) {
            const filt = state.pagination?.filt as IFilter[] | undefined
            const pagination = { ...state.pagination, filt: filt?.filter((filter) => filter.param !== column.param) }
            dispatch({ pagination })
        }

        currentThead[indexColumn] = { ...column, hiddeColumn: value }
        dispatch({ thead: currentThead })
    }

    const sortByParam = (param: string, desc: boolean) => {
        const sort = state.pagination?.sort as ISortType | undefined
        let pagination = { ...state.pagination }

        // delete sort value if the column has been filtered
        if ((sort) && (sort.selector === param) && (sort.desc === desc)) {
            pagination.sort = undefined
            dispatch({ pagination })
            return
        }

        pagination.sort = { desc, selector: param } as ISortType
        dispatch({ pagination })
        return
    }

    const simpleSetFilter = (param: string, signal: signalType, type: filterTextType, value?: string | number) => {
        const filt = state.pagination?.filt as IFilter[] | undefined
        const newFilter: IFilter = { param, signal, value, type }
        let pagination = { ...state.pagination }

        // delete all the filters with the same param
        if (filt) {
            let currentFilt = [...filt].filter((filt) => filt.param !== param)
            Boolean(value) && currentFilt.push(newFilter)

            pagination.filt = currentFilt.length > 0 ? currentFilt : undefined
            dispatch({ pagination })
            return
        }

        pagination.filt = [newFilter]
        Boolean(value) && dispatch({ pagination })
        return
    }

    const intervalSetFilter = (newFilters: IFilter[]) => {
        const filt = state.pagination?.filt as IFilter[] | undefined
        const currentParam = newFilters.map((filt) => filt.param)
        const cleanNewFilter = newFilters.filter((filt) => Boolean(filt.value))
        let pagination = { ...state.pagination }

        // delete all the filters with the same param
        if (filt) {
            let currentFilt = [...filt].filter((filt) => !currentParam.includes(filt.param))
            currentFilt = [...currentFilt, ...cleanNewFilter]

            pagination.filt = currentFilt.length > 0 ? currentFilt : undefined
            dispatch({ pagination })
            return
        }

        pagination.filt = cleanNewFilter.length > 0 ? cleanNewFilter : undefined
        dispatch({ pagination })
        return
    }

    const changeAsideColumnValue = () => {
        dispatch({ showAsideColumnHandler: !state.showAsideColumnHandler })
    }

    const setRowToExpand = (rowExpanded: string) => {
        state.rowExpanded !== rowExpanded ? dispatch({ rowExpanded }) : dispatch({ rowExpanded: undefined })
    }

    return {
        state, changePage, changeLimit, showFilterColumn, sortByParam, setRowToExpand,
        simpleSetFilter, changeAsideColumnValue, intervalSetFilter, setTheadHiddenValue
    }
}