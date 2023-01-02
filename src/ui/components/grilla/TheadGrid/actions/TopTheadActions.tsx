import { useHandleTextInputWithTimer, useSearchInput } from "@components/grilla/hooks"
import { useHandleShowColumn } from "@components/grilla/hooks/handleTopActions"
import { LoadingIcon, DeleteFilterText } from "@components/grilla/widgets/Icon"
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
    const { button, showAsideColumnHandler } = useHandleShowColumn()

    return (
        <>
            {button}
            {showAsideColumnHandler && (
                <div className={styles.aside__column}>
                    aaaaaaaaaa

                </div>
            )
            }

        </>
    )

}