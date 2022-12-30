import { useContext, useMemo } from "react"
import { GridContext, IFilter } from "../context"

export const useSearchInput = () => {

    const { thead, pagination, intervalSetFilter } = useContext(GridContext)

    const columnsWithSearch = useMemo(() => {
        return thead.filter(column => column.isSearch)
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
        intervalSetFilter,
        handleSearchInput
    }

}