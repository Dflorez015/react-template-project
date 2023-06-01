import { useState } from "react"
import { IFilter } from "../context"
import { useGetIntervalFilterByParam } from "./usePaginationSelector"

/*----------------------------------------- interfaces -----------------------------------------*/
export type SubmitForm = React.FormEvent<HTMLFormElement>

/*----------------------------------------- hooks -----------------------------------------*/
/**
 * Hook that controls the forms that allow filtering by a range of values
 * @param {IFilter} filter column config filter
 * @returns 
 */
export const useHandleIntervalFilter = (filter: IFilter) => {
    // hooks
    const { currentValue, intervalSetFilter } = useGetIntervalFilterByParam(filter.param)
    const [state, setState] = useState<{ [key: string]: string }>({ major: `${currentValue.major ?? ""}`, minor: `${currentValue.minor ?? ""}` })

    // functions
    const changeFiltValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target
        setState({ ...state, [id]: value })
    }

    const sendValue = (e: SubmitForm) => {
        e.preventDefault()
        let currentFilters: IFilter[] = []

        for (const key in state) {
            currentFilters.push(adaptFilterByInput(key, state[key]))
        }

        intervalSetFilter(currentFilters)
    }

    const adaptFilterByInput = (stateParam: string, value: string | number) => {
        return { ...filter, signal: stateParam === "minor" ? "<=" : ">=", value } as IFilter
    }

    return { changeFiltValue, sendValue, state }
}