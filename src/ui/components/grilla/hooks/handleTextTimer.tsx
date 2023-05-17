import { useState } from "react"

/*----------------------------------------- interfaces -----------------------------------------*/
export type HandleInput = React.ChangeEvent<HTMLInputElement>

/*----------------------------------------- hooks -----------------------------------------*/
/**
 * Hook controlling a value by means of a timeout
 * @param {Function} handle function that is triggered when the timer runs out
 * @param queryValue initial value for the value
 * @returns 
 */
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
        setTimerId(Number(newTimerId))
        setLoading(true)
    }

    const removeSearchInput = () => {
        handle()
        setSearchValue("")
    }

    return { loading, searchValue, handleInput, removeSearchInput, setSearchValue }
}