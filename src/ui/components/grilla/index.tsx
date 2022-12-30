import { GridContext, IGrid, useHandleGridContext } from "./context"
import GridThead from "./TheadGrid"
import { SearchByInGrid } from "./TheadGrid/actions";
import styles from './TheadGrid/grid.module.css';

export const Grilla = ({ url, thead, children }: IGrid) => {
    const { state, changeLimit, changePage, showFilterColumn, sortByParam, simpleSetFilter, intervalSetFilter } = useHandleGridContext({ url, thead })

    return (
        <GridContext.Provider value={{ ...state, sortByParam, changeLimit, changePage, showFilterColumn, simpleSetFilter, intervalSetFilter }}>

            <SearchByInGrid /> {/* search input*/}

            <table className={styles.grid__style}>
                <GridThead />
                {children}
            </table>
        </GridContext.Provider>
    )
}