import { useContext, useEffect, useMemo } from "react"
import { GridContext, IFilter } from "../context"

export const useSearchInput = () => {
    const thead = useContext(GridContext).thead
    const pagination = useContext(GridContext).pagination
    const intervalSetFilter = useContext(GridContext).intervalSetFilter

    useRefreshFilterSearch()

    const columnsWithSearch = useMemo(() => {
        return thead.filter(column => (column.isSearch && !column.hiddeColumn))
    }, [thead])

    const placheHolderInput = useMemo(() => {
        return `${columnsWithSearch.map((column) => column.label)}`
    }, [columnsWithSearch])

    const currentValue = useMemo(() => {
        const filtParam = columnsWithSearch.at(0)?.param
        return pagination?.filt?.filter((filt) => filt.param === filtParam)[0]?.value ?? ""
    }, [pagination?.filt, columnsWithSearch])

    function handleSearchInput(value?: string) {
        let currentFilters: IFilter[] = []

        for (const column of columnsWithSearch) {
            currentFilters.push({ param: column.param, value, signal: "contains", type: "text", groupSignal: "or" })
        }

        currentFilters.length > 0 && intervalSetFilter!(currentFilters)
    }

    return {
        placheHolderInput,
        currentValue,
        handleSearchInput
    }
}

/**
 * refresh search filter when show a column with @type {isSearch?: boolean}
 */
const useRefreshFilterSearch = () => {
    const intervalSetFilter = useContext(GridContext).intervalSetFilter
    const thead = useContext(GridContext).thead
    const filt = useContext(GridContext).pagination?.filt

    useEffect(() => {
        const searchFilt = filt?.filter((filter) => filter.groupSignal === 'or')

        if (searchFilt && searchFilt.length > 0) {
            const theadForSearch = thead.filter((column) => column.isSearch && !column.hiddeColumn)
            const currentSearchValue = searchFilt[0].value
            let currentFilters: IFilter[] = []

            for (const column of theadForSearch) {
                currentFilters.push({ param: column.param, value: currentSearchValue, signal: "contains", type: "text", groupSignal: "or" })
            }

            intervalSetFilter!(currentFilters)
        }
    }, [thead])
}