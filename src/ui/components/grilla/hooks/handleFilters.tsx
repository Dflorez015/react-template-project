import { useState } from "react"
import { IFilter } from "../context"
import { useGetIntervalFilterByParam } from "./usePaginationSelector"

export type SubmitForm = React.FormEvent<HTMLFormElement>
export const useHandleIntervalFilter = (filter: IFilter) => {

    const { currentValue, intervalSetFilter } = useGetIntervalFilterByParam(filter.param)
    const [state, setState] = useState<{ [key: string]: string }>({ major: `${currentValue.major ?? ""}`, minor: `${currentValue.minor ?? ""}` })

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

        intervalSetFilter!(currentFilters)
    }

    const adaptFilterByInput = (stateParam: string, value: string | number) => {
        return { ...filter, signal: stateParam === "minor" ? "<=" : ">=", value } as IFilter
    }

    return { changeFiltValue, sendValue, state }
}