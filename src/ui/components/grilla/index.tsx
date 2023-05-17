import { GridContext, IGrid, useHandleGridContext } from "./context"
import { GridFooter } from "./FooterGrid";
import GridThead from "./TheadGrid"
import styles from "./grid.module.css";
import { HandleColumnsVisibility, QuickSearchGrid } from "./TheadGrid/actions";
import { TopListActions } from "./TheadGrid/actions/TopTheadActions";

export const Grilla = ({ url, thead, children, withoutTopActions, withoutBottomActions, gridOptions }: IGrid) => {
    const { state, changeLimit, changePage, showFilterColumn, sortByParam, setRowToExpand,
        simpleSetFilter, changeAsideColumnValue, intervalSetFilter, setTheadHiddenValue, setCurrentMetadaPagination } = useHandleGridContext({ url, thead })

    return (
        <GridContext.Provider value={{
            ...state, sortByParam, changeLimit, changePage, showFilterColumn, setRowToExpand, setCurrentMetadaPagination,
            simpleSetFilter, changeAsideColumnValue, intervalSetFilter, setTheadHiddenValue
        }}>

            {/*--------------------------- main search input --------------------------- */}
            {
                !withoutTopActions ? (
                    <div className={styles.top__actions__wrapper}>
                        <QuickSearchGrid /> {/* search input*/}
                        <HandleColumnsVisibility />
                        {gridOptions && <TopListActions children={gridOptions} />}
                    </div>
                ) : null
            }

            {/*--------------------------- tbody children --------------------------- */}
            <div className={styles.grid__wrapper__style} data-table="true">
                <table className={styles.grid__style}>
                    <GridThead />
                    {children}
                </table>
            </div>

            {/*--------------------------- footer / pagination --------------------------- */}
            {!withoutBottomActions ? (
                <div className={styles.top__actions__wrapper}>
                    <GridFooter />
                </div>
            ) : null}

        </GridContext.Provider>
    )
}