import { useMemo } from "react"
import { IFilter, IMetaDataPagination, IPaginationFilterDto, ISortType, useGridContext } from "../context"

/**
 * Function than resolve the object filter of the grid into string format for the service
 * @param {IFilter[] | undefined} filt current filter on the grid
 * @returns 
 */
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

/**
 * Transform the sort object on the grid into a string for the service
 * @param sort 
 * @returns 
 */
const sortAdapter = (sort: ISortType | undefined) => {
    if (sort) return `[${sort}]`
    return ""
}

/**
 * Hook that returns the pagination that has a grid that encompasses it
 * @returns {string, string} query params (page, limit, filt, etc...) manupulated on the grid
 */
export const useGridInfo = () => {
    const { pagination, thead, url, setCurrentMetadaPagination } = useGridContext()

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

    /**
    * changes the pagination based on the "metadata".
    * @param currentPage actual page number
    * @param itemCount meta item
    * @param itemsPerPage actual limit pagination number
    * @param totalItems meta total items on the service
    * @param totalPages meta all pages on the service
    */
    const changeFooterPaginate = (metaData: IMetaDataPagination) => {
        setCurrentMetadaPagination(metaData)
    }


    return { queryParams, thead, changeFooterPaginate }
}

/**
 * Note: this pagination is used for Graphql APIS
 * Hook that returns the pagination that has a grid that encompasses it
 * @returns {string, string} query params (page, limit, filt, etc...) manupulated on the grid
 */
export const useGridInfoGraphql = () => {
    const { pagination, thead, setCurrentMetadaPagination } = useGridContext()

    const queryParams: IPaginationFilterDto = useMemo(() => {
        if (pagination) {
            const { filt, limit, page, sort } = pagination

            const filtServiceAdapter = filterAdapter(filt)
            const sortServiceAdapter = sortAdapter(sort)

            return {
                filt: filtServiceAdapter, limit: +(limit ?? "20"),
                page: +(page ?? "1"), sort: sortServiceAdapter
            }
        }

        return { page: 1, limit: 30 }
    }, [pagination])

    /**
     * changes the pagination based on the "metadata".
     * @param currentPage actual page number
     * @param itemCount meta item
     * @param itemsPerPage actual limit pagination number
     * @param totalItems meta total items on the service
     * @param totalPages meta all pages on the service
     */
    const changeFooterPaginate = (metaData: IMetaDataPagination) => {
        setCurrentMetadaPagination(metaData)
    }

    return { queryParams, thead, changeFooterPaginate }
}
