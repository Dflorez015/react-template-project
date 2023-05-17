import { AnimatePresence, motion } from "framer-motion"
import { MenuList } from "@components/styled/MenuStyled"
import styles from "@grilla/grid.module.css"
import { useHandleTextInputWithTimer, useSearchInput, useHandleShowColumn } from "@grilla/hooks"
import { LoadingIcon, DeleteFilterText, ColumnsIcon, OptionsIcon } from "@grilla/utils/Icon"

/**
 * Field that allows a multi-column search
 * set the filt configuration of the grid
 * @returns 
 */
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

/**
 * Displays the menu of columns to hide or show them.
 * set the columns configuration of the grid
 * @returns 
 */
export const HandleColumnsVisibility = () => {
    const { button, showAsideColumnHandler, arrow, thead, changeInput } = useHandleShowColumn()

    return (
        <>
            {button}

            <AnimatePresence>
                {showAsideColumnHandler ? (
                    <motion.div className={styles.aside__column}
                        exit={{ width: 0, opacity: 0 }} initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 300, opacity: 1 }}>
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
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    )
}

/**
 * Displays the list actions passed to the grid
 * @param {JSX.Element} children The optional list
 * @returns 
 */
export const TopListActions = ({ children }: { children?: React.ReactNode }) => {
    return (
        <MenuList menuButton={<button className={styles.top__button__action}><OptionsIcon />Opciones</button>}>
            {children}
        </MenuList>
    )
}