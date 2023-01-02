import { GridContext, IGrid, useHandleGridContext } from "./context"
import GridThead from "./TheadGrid"
import { HandleColumnsVisibility, QuickSearchGrid } from "./TheadGrid/actions";
import styles from './TheadGrid/grid.module.css';

export const Grilla = ({ url, thead, children, withoutTopActions }: IGrid) => {
    const { state, changeLimit, changePage, showFilterColumn, sortByParam, simpleSetFilter, changeAsideColumnValue, intervalSetFilter } = useHandleGridContext({ url, thead })

    return (
        <GridContext.Provider value={{ ...state, sortByParam, changeLimit, changePage, showFilterColumn, simpleSetFilter, changeAsideColumnValue, intervalSetFilter }}>

            {
                !withoutTopActions ? (
                    <div className={styles.top__actions__wrapper}>
                        <QuickSearchGrid /> {/* search input*/}
                        <HandleColumnsVisibility />
                    </div>
                ) : null}

            <table className={styles.grid__style}>
                <GridThead />
                {children}
            </table>

        </GridContext.Provider>
    )
}