import { useContext, useMemo } from "react"
import { GridContext } from "../context"

const typesParams: { [key: string]: string } = {
    ">": "major",
    ">=": "major",
    "<": "minor",
    "<=": "minor"
}

type objectIterator = { [key: string]: string | number }


export const useGetTextFilterByParam = (filtParam: string) => {
    const { simpleSetFilter, pagination } = useContext(GridContext)

    const currentValue = useMemo(() => {
        return pagination?.filt?.filter((filt) => filt.param === filtParam)[0]?.value ?? ""
    }, [pagination?.filt])

    return { currentValue, simpleSetFilter }
}


export const useGetIntervalFilterByParam = (filtParam: string) => {
    const { intervalSetFilter, pagination } = useContext(GridContext)

    const currentValue = useMemo(() => {
        const filtersByParam = pagination?.filt?.filter((filt) => filt.param === filtParam)
        let values: objectIterator = {}

        if (filtersByParam && Boolean(filtersByParam.length)) {
            for (const filt of filtersByParam) {
                let param = typesParams[filt.signal]
                values[param] = filt.value ?? ""
            }
        }

        return values

    }, [pagination?.filt])

    return { currentValue, intervalSetFilter }

}


export const useIsColumnInAction = (columnParam: string) => {

    const { pagination } = useContext(GridContext)

    const isInAction = useMemo(() => {

        if (columnParam === "") return false

        if (pagination) {

            if (pagination.sort) return pagination.sort.selector === columnParam

            if (pagination.filt) {
                return pagination.filt.some((filt) => filt.param === columnParam)
            }
        }

        return false
    }, [pagination])

    return { isInAction }
}