import { GridContext, IGrid, useHandleGridContext } from "./context"
import GridThead from "./TheadGrid"

export const Grilla = ({ url, thead, children }: IGrid) => {
    const { state, changeLimit, changePage, showFilterColumn, sortByParam, simpleSetFilter, intervalSetFilter } = useHandleGridContext({ url, thead })

    return (
        <GridContext.Provider value={{ ...state, sortByParam, changeLimit, changePage, showFilterColumn, simpleSetFilter, intervalSetFilter }}>
            <table>
                <GridThead />
                {children}
            </table>
        </GridContext.Provider>
    )
}