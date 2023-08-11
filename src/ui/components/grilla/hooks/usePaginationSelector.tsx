import { useMemo } from "react"
import { useGridContext } from "../context"

/*----------------------------------------- interfaces -----------------------------------------*/
const typesParams: { [key: string]: string } = {
    ">": "major",
    ">=": "major",
    "<": "minor",
    "<=": "minor"
}

type objectIterator = { [key: string]: string | number }

/*----------------------------------------- hooks -----------------------------------------*/
/**
 * Returns the current status of a field and changes its value in the filter
 * set the filt configuration of the grid
 * @param {string} filtParam column param
 * @returns 
 */
export const useGetTextFilterByParam = (filtParam: string) => {
    const { simpleSetFilter, pagination } = useGridContext()

    const currentValue = useMemo(() => {
        return pagination?.filt?.filter((filt) => filt.param === filtParam)[0]?.value ?? ""
    }, [pagination?.filt])

    return { currentValue, simpleSetFilter }
}

/**
 * Returns the current status of a field and changes its value in the filter
 * set the filt configuration of the grid
 * @param {string} filtParam column param
 * @returns 
 */
export const useGetIntervalFilterByParam = (filtParam: string) => {
    const { intervalSetFilter, pagination } = useGridContext()

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

/**
 * Returns whether the grid column can perform any action.
 * @param {string} columnParam 
 * @returns 
 */
export const useIsColumnInAction = (columnParam: string) => {
    // hooks
    const pagination = useGridContext().pagination
    const isInAction = useMemo(() => {
        let hasAction = false
        if (columnParam === "") return hasAction

        if (pagination) {
            if (pagination.sort) {
                if (pagination.sort.some((item) => item.selector === columnParam)) return true
            }

            if (pagination.filt) {
                hasAction = pagination.filt.some((filt) => filt.param === columnParam)
            }
        }

        return hasAction
    }, [pagination])

    return { isInAction }
}