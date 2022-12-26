import { useState } from "react"
import { IFilter } from "../context"
import { useGetIntervalFilterByParam } from "./paginationSelector"

export type HandleInput = React.ChangeEvent<HTMLInputElement>
export const useHandleTextInputWithTimer = (handle: (value?: string) => void, queryValue?: string | number) => {
    // hooks
    const [loading, setLoading] = useState(false)
    const [timerId, setTimerId] = useState(0)
    const [searchValue, setSearchValue] = useState(queryValue ?? "")

    // functions
    const handleInput = async (e: HandleInput) => {
        const { value } = e.target
        clearTimeout(timerId)
        setSearchValue(value)
        const newTimerId = setTimeout(() => {
            (value !== queryValue || !value) && handle(value)
            setLoading(false)
        }, 1000)
        setTimerId(newTimerId)
        setLoading(true)
    }

    const removeSearchInput = () => {
        handle()
        setSearchValue("")
    }

    return { loading, searchValue, handleInput, removeSearchInput, setSearchValue }
}

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