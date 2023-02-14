import { useContext, useMemo } from "react"
import { GridContext, IFilter, ISortType } from "../context"

const filterAdapter = (filt: IFilter[] | undefined) => {
    if (filt) {

        if (filt.length === 1) {
            const { param, value, signal } = filt[0]
            return `["${param}", "${signal}", "${value}"]`
        }

        let queryFilt = []

        // -- columns simple filter --

        const simpleAndFilt = filt.filter(filter => filter.groupSignal === undefined)
            .map((search) => `["${search.param}", "${search.signal}", "${search.value}"]`)
            .toString()

        if (simpleAndFilt) queryFilt.push(simpleAndFilt.toString().replaceAll("],[", `],"and",[`))

        // -- columns multiple filter (interval filter, grouper filter) --

        let andFiltersGroupers = filt.filter(filter => filter.groupSignal === "and")

        for (const filterIterator of andFiltersGroupers) {
            let currentGroupFilter = andFiltersGroupers.filter(filter => filter.param === filterIterator.param)

            if (currentGroupFilter.length > 1) {

                const stringCurrentFilters = currentGroupFilter
                    .map(filter => `["${filter.param}", "${filter.signal}", "${filter.value}"]`)
                    .toString().replaceAll("],[", `],"and",[`)

                queryFilt.push(stringCurrentFilters)

            }
            if (currentGroupFilter.length === 1) queryFilt.push(`["${filterIterator.param}","${filterIterator.signal}","${filterIterator.value}"]`)

            andFiltersGroupers = andFiltersGroupers.filter(filter => filter.param !== filterIterator.param)
        }

        // -- top action input search filter --

        const searchInputFilt = filt.filter(filter => filter.groupSignal === "or")
            .map((search) => `["${search.param}","${search.signal}","${search.value}"]`)

        if (searchInputFilt.length > 1) { queryFilt.push(`[${searchInputFilt.toString().replaceAll("],[", `],"or",[`)}]`) }
        else if (searchInputFilt.length === 1) queryFilt.push(`${searchInputFilt.toString().replaceAll("],[", `],"or",[`)}`)

        return queryFilt.toString().replaceAll("],[", `],"and",[`)

    }
    return ""
}

const sortAdapter = (sort: ISortType | undefined) => {
    if (sort) return `[${sort}]`
    return ""
}

export const useGridInfo = () => {
    const pagination = useContext(GridContext).pagination
    const url = useContext(GridContext).url

    const queryParams: string = useMemo(() => {
        if (pagination) {
            const { filt, limit, page, sort } = pagination

            const filtServiceAdapter = filterAdapter(filt)
            const sortServiceAdapter = sortAdapter(sort)

            return url + "?" + new URLSearchParams({
                filt: filtServiceAdapter, limit: limit ?? "30",
                page: page ?? "1", sort: sortServiceAdapter
            }).toString()
        }

        return url + "?" + new URLSearchParams({ page: "1", limit: "30" }).toString()
    }, [pagination])

    return { queryParams }
}
