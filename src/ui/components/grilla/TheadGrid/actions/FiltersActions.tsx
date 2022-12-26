import { getCurrentDate } from "@services/utility"
import { IFilter } from "@components/grilla/context"
import { useGetTextFilterByParam, useHandleIntervalFilter, useHandleTextInputWithTimer } from "@components/grilla/hooks"
import styles from "../grid.module.css"

interface IFilterActionsProps { label: string, filter: IFilter }
export const FiltersActions = (props: IFilterActionsProps) => {
    const { type } = props.filter

    return (
        <div className={styles.actions__wrapper} style={{ gap: "10px" }}>
            <label>Buscar por:</label>
            <>
                {type === "text" && (<FilterTextType {...props} />)}
                {type === "number" && (<FilterNumberType {...props} />)}
                {type === "date" && (<FilterDateType {...props} />)}
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
        <div className={styles.row__inputs__wrapper}>
            <input type="text" onChange={handleInput} value={searchValue} placeholder={label} />
            {loading && <LoadingIcon />}
            {(Boolean(currentValue) && !loading) && <DeleteFilterText remove={removeSearchInput} />}
        </div>
    )
}
const FilterNumberType = ({ filter }: IFilterActionsProps) => {

    const { changeFiltValue, sendValue, state } = useHandleIntervalFilter({ ...filter })

    return (
        <form className={styles.form__filter__wrapper} onSubmit={sendValue}>

            <div className={styles.actions__wrapper} style={{ gap: "2px" }}>
                <label htmlFor="major">Un valor mayor a:</label>
                <input type="number" id="major" onChange={changeFiltValue} value={state.major} />
            </div>

            <div className={styles.actions__wrapper} style={{ gap: "2px" }}>
                <label htmlFor="minor">Un valor menor a:</label>
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

    console.log('getCurrentDate(', getCurrentDate())

    return (
        <form className={styles.form__filter__wrapper} onSubmit={sendValue}>

            <div className={styles.actions__wrapper} style={{ gap: "2px" }}>
                <label htmlFor="major">Una fecha mayor a:</label>
                <input type="datetime-local" id="major" onChange={changeFiltValue}
                    value={state.major} />
            </div>

            <div className={styles.actions__wrapper} style={{ gap: "2px" }}>
                <label htmlFor="minor">Una fecha menor a:</label>
                <input type="datetime-local" id="minor" onChange={changeFiltValue} value={state.minor} />
            </div>

            <button type="submit">
                Enviar
            </button>

        </form>
    )
}

const DeleteFilterText = ({ remove }: { remove: () => void }) => {
    return (
        <svg className={styles.left__icon__position + " " + styles.delete__icon} stroke="currentColor"
            fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em"
            xmlns="http://www.w3.org/2000/svg" onClick={remove}>
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z">
            </path>
        </svg>
    )
}

const LoadingIcon = () => {
    return (
        <svg className={styles.left__icon__position + " " + styles.loading__icon} stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path>
            <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor"></path><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor"></path>
        </svg>
    )
}