import { useMemo } from "react"
import { useGetTextFilterByParam, useHandleIntervalFilter, useHandleTextInputWithTimer } from "@components/grilla/hooks"
import { LoadingIcon, DeleteFilterText } from "@components/grilla/widgets/Icon"
import styles from "../grid.module.css"
import { getCurrentDate } from "@services/utility"
import { IFilter } from "@components/grilla/context"

interface IFilterActionsProps { label: string, filter: IFilter }
export const FiltersActions = (props: IFilterActionsProps) => {
    const { type } = props.filter

    return (
        <div className={styles.actions__wrapper} style={{ gap: "10px" }}>
            <>
                {type === "text" && (<FilterTextType {...props} />)}
                {type === "number" && (<FilterNumberType {...props} />)}
                {type === "date" && (<FilterDateType {...props} />)}
                {type === "boolean" && (<FilterBooleanType {...props} />)}
            </>
        </div>
    )
}


const FilterTextType = ({ filter, label }: IFilterActionsProps) => {
    const { currentValue, simpleSetFilter } = useGetTextFilterByParam(filter.param)

    const { handleInput, loading, removeSearchInput, searchValue } = useHandleTextInputWithTimer(changeFiltValue, currentValue)

    function changeFiltValue(value?: string | number) {
        simpleSetFilter!(filter.param, filter.signal, filter.type, value)
    }

    return (
        <>
            <label htmlFor={filter.param}>Buscar por:</label>
            <div className={styles.row__inputs__wrapper} style={{ marginBottom: "10px" }}>
                <input type="text" id={filter.param} onChange={handleInput} value={searchValue} placeholder={label} />
                {loading && <LoadingIcon />}
                {(Boolean(currentValue) && !loading) && <DeleteFilterText remove={removeSearchInput} />}
            </div>
        </>
    )
}


const FilterNumberType = ({ filter }: IFilterActionsProps) => {

    const { changeFiltValue, sendValue, state } = useHandleIntervalFilter({ ...filter })

    return (
        <form className={styles.form__filter__wrapper} onSubmit={sendValue}>
            <p>Filtrar por un valor</p>

            <div className={styles.actions__wrapper} style={{ gap: "2px" }}>
                <label htmlFor="major">mayor a:</label>
                <input type="number" id="major" onChange={changeFiltValue} value={state.major} />
            </div>

            <div className={styles.actions__wrapper} style={{ gap: "2px" }}>
                <label htmlFor="minor">menor a:</label>
                <input type="number" id="minor" onChange={changeFiltValue} value={state.minor} />
            </div>

            <button type="submit">
                Enviar
            </button>
        </form>
    )
}


const FilterDateType = ({ filter }: IFilterActionsProps) => {

    const { changeFiltValue, sendValue, state } = useHandleIntervalFilter({ ...filter })

    const currentDate = useMemo(() => getCurrentDate(), [])

    return (
        <form className={styles.form__filter__wrapper} onSubmit={sendValue}>
            <p>Filtrar por una fecha</p>

            <div className={styles.actions__wrapper} style={{ gap: "2px" }}>
                <label htmlFor="major">mayor a:</label>
                <input type="datetime-local" id="major" onChange={changeFiltValue}
                    value={state.major} max={state.minor === "" ? currentDate : state.minor} />
            </div>

            <div className={styles.actions__wrapper} style={{ gap: "2px" }}>
                <label htmlFor="minor">menor a:</label>
                <input type="datetime-local" id="minor" onChange={changeFiltValue}
                    value={state.minor} min={state.major} max={currentDate} />
            </div>

            <button type="submit">
                Enviar
            </button>
        </form>
    )
}


const FilterBooleanType = ({ filter }: IFilterActionsProps) => {
    return <></>
}