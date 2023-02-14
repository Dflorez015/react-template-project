import { useHandleTextInputWithTimer, useSearchInput } from "@components/grilla/hooks"
import { useHandleShowColumn } from "@components/grilla/hooks/handleTopActions"
import { LoadingIcon, DeleteFilterText, ColumnsIcon } from "@components/grilla/utils/Icon"
import styles from "../grid.module.css"

export const QuickSearchGrid = () => {
    const { placheHolderInput, currentValue, handleSearchInput } = useSearchInput()

    const { handleInput, loading, removeSearchInput, searchValue } = useHandleTextInputWithTimer(handleSearchInput, currentValue)

    return (
        <>
            <div className={styles.search__input__wrapper}>
                <label htmlFor="searchInput">Buscar por:</label>
                <div className={styles.row__inputs__wrapper}>
                    <input type="text" id="searchInput" onChange={handleInput} value={searchValue} placeholder={placheHolderInput} />
                    {loading && <LoadingIcon />}
                    {(Boolean(currentValue) && !loading) && <DeleteFilterText remove={removeSearchInput} />}
                </div>
            </div>
        </>
    )
}

export const HandleColumnsVisibility = () => {
    const { button, showAsideColumnHandler, arrow, thead, changeInput } = useHandleShowColumn()

    return (
        <>
            {button}

            {showAsideColumnHandler ? (
                <div className={styles.aside__column}>
                    <div className={styles.aside__column__header}>
                        <div>
                            <ColumnsIcon />
                            Columnas
                        </div>

                        {arrow}
                    </div>

                    <div className={styles.aside__column__content}>
                        <p>Mostrar columna</p>

                        <ul className={styles.aside__list__columns}>
                            {thead.map((column, index) => (
                                Boolean(column.param) && (
                                    <div key={index}>
                                        <input type="checkbox" id={column.param} name={`${index}`} checked={!column.hiddeColumn} onChange={changeInput} />
                                        <label htmlFor={column.param}>{column.label}</label>
                                    </div>
                                )
                            ))}
                        </ul>
                    </div>
                </div>
            ) : null
            }

        </>
    )
}