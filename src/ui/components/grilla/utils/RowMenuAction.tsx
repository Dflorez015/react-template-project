import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuRowGrid, MenuActionRow } from "@ui/components/styled";
import { ExpandGridRow, RowActionSvg } from "./Icon";
import { GridContext } from "../context";
import styles from "@grilla/grid.module.css"

interface IComponentChildren { children: JSX.Element }
interface IComponentId { rowId: string }

export const TdActionComponent = ({ children }: IComponentChildren) => {

    return (
        <td style={{ textAlign: "center" }}>
            <MenuRowGrid menuButton={({ open }) => <MenuActionRow $isOpen={open}><RowActionSvg /></MenuActionRow>}>
                <>
                    {children}
                </>
            </MenuRowGrid>
        </td>
    )
}

export const TdExpandGridButton = ({ rowId }: IComponentId) => {

    const rowExpanded = useContext(GridContext).rowExpanded
    const setRowToExpand = useContext(GridContext).setRowToExpand!

    return (
        <td style={{ textAlign: "center" }}>
            <ExpandGridRow isExpanded={rowExpanded === rowId} onClick={() => setRowToExpand(rowId)} />
        </td >
    )
}

export const RowNestedGridExpanded = ({ children, rowId }: IComponentChildren & IComponentId) => {

    const rowExpanded = useContext(GridContext).rowExpanded

    return (
        <AnimatePresence>
            {rowExpanded === rowId ? (
                <motion.tr style={{ overflowY: "hidden", position: "relative", backgroundColor: "var(--stroke_disabled)" }} initial={{ height: 0, opacity: 0 }} exit={{ height: 0, opacity: 0 }} animate={{ height: 250, opacity: 1 }}>
                    <td>
                        <div className={styles.nested__grid__wrapper}>
                            {children}
                        </div>
                    </td>
                </motion.tr>
            ) : null}
        </AnimatePresence>
    )
}