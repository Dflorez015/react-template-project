import { useState } from "react"

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