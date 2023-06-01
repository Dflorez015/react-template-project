import { GridContext, IContextState, IGrid, IPagination, useHandleGridContext } from "./context"
import { GridFooter } from "./FooterGrid";
import GridThead from "./TheadGrid"
import styles from "./grid.module.css";
import { HandleColumnsVisibility, QuickSearchGrid } from "./TheadGrid/actions";
import { TopListActions } from "./TheadGrid/actions/TopTheadActions";

/**
 * component that allows paging and returns the component's status through a hook.
 * @param {IGrid} props
 * @returns 
 */
export const Grilla = ({ url, thead, children, withoutTopActions, withoutBottomActions, gridOptions, defaultPagination }: IGrid) => {

    return (
        <GrillaProvider thead={thead} url={url} pagination={defaultPagination}>
            <>
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
            </>
        </GrillaProvider>
    )
}

const GrillaProvider = ({ thead, url, children, pagination }: IContextState & { children: JSX.Element, pagination?: IPagination }) => {
    const gridState = useHandleGridContext({ url, thead, pagination })

    return (
        <GridContext.Provider value={gridState}>
            {children}
        </GridContext.Provider>
    )
}