import { GridContext, IGrid, useHandleGridContext } from "./context"
import { GridFooter } from "./FooterGrid";
import GridThead from "./TheadGrid"
import { HandleColumnsVisibility, QuickSearchGrid } from "./TheadGrid/actions";
import { TopListActions } from "./TheadGrid/actions/TopTheadActions";
import styles from "./grid.module.css";

export const Grilla = ({ url, thead, children, withoutTopActions, gridOptions }: IGrid) => {
    const { state, changeLimit, changePage, showFilterColumn, sortByParam, setRowToExpand,
        simpleSetFilter, changeAsideColumnValue, intervalSetFilter, setTheadHiddenValue } = useHandleGridContext({ url, thead })

    return (
        <GridContext.Provider value={{
            ...state, sortByParam, changeLimit, changePage, showFilterColumn, setRowToExpand,
            simpleSetFilter, changeAsideColumnValue, intervalSetFilter, setTheadHiddenValue
        }}>

            {
                !withoutTopActions ? (
                    <div className={styles.top__actions__wrapper}>
                        <QuickSearchGrid /> {/* search input*/}
                        <HandleColumnsVisibility />
                        {gridOptions && <TopListActions children={gridOptions} />}
                    </div>
                ) : null
            }

            <div className={styles.grid__wrapper__style}>
                <table className={styles.grid__style}>
                    <GridThead />
                    {children}
                </table>
            </div>

            {!withoutTopActions ? (
                <div className={styles.top__actions__wrapper}>
                    <GridFooter />
                </div>
            ) : null}

        </GridContext.Provider>
    )
}