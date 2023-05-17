import { useEffect, useMemo } from "react"
import { IFilter, useGridContext } from "../context"

/**
 * Returns the status of the main search field and controls which fields can be filtered on
 * set the filt configuration of the grid
 * @returns 
 */
export const useSearchInput = () => {
    // hooks
    const thead = useGridContext().thead
    const pagination = useGridContext().pagination
    const intervalSetFilter = useGridContext().intervalSetFilter

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

    //functions
    function handleSearchInput(value?: string) {
        let currentFilters: IFilter[] = []

        for (const column of columnsWithSearch) {
            currentFilters.push({ param: column.param, value, signal: "contains", type: "text", groupSignal: "or" })
        }

        currentFilters.length > 0 && intervalSetFilter!(currentFilters)
    }

    return { placheHolderInput, currentValue, handleSearchInput }
}

/**
 * Refresh search filter when show a column with @type {isSearch?: boolean}
 */
const useRefreshFilterSearch = () => {
    const intervalSetFilter = useGridContext().intervalSetFilter
    const thead = useGridContext().thead
    const filt = useGridContext().pagination?.filt

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