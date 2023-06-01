import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";
import { ICustomeMenuSzh, MenuList } from "@components/styled/MenuStyled";
import { MenuActionRow } from "./styled.components";
import { ExpandGridRow, RowActionSvg } from "./Icon";
import styles from "@grilla/grid.module.css"
import { useGridContext } from "../context";

interface IComponentChildren { children: JSX.Element }
interface IComponentId { rowId: string }

/**
 * Button menu action on row grid
 * @param {JSX.Element, ...config} props pass a fragment component with <MenuItem/> tags, and, optionally the button config
 * @returns 
 */
export const TdActionComponent = ({ children, viewScroll = "auto", position = "auto", direction = "bottom", align = "start" }: IComponentChildren & ICustomeMenuSzh) => {
    // hooks
    const MenuButton = (open: boolean) => useMemo(() => (<MenuActionRow $isOpen={open}><RowActionSvg /></MenuActionRow>), [open])

    return (
        <td style={{ textAlign: "center" }}>
            <MenuList viewScroll={viewScroll} position={position} align={align} direction={direction}
                offsetX={(direction === 'left' || direction === 'right') ? 8 : 0}
                offsetY={(direction === 'top' || direction === 'bottom') ? 8 : 0}
                menuButton={({ open }) => MenuButton(open)}>
                <>
                    {children}
                </>
            </MenuList>
        </td>
    )
}

/**
 * Button expand row action
 * @param {string} rowId ID of the row (is the id param from the list) 
 * @returns 
 */
export const TdExpandGridButton = ({ rowId }: IComponentId) => {
    // hooks
    const rowExpanded = useGridContext().rowExpanded
    const setRowToExpand = useGridContext().setRowToExpand

    return (
        <td style={{ textAlign: "center" }}>
            <ExpandGridRow isExpanded={rowExpanded === rowId} onClick={() => setRowToExpand(rowId)} />
        </td >
    )
}

/**
 * Nested grid on row
 * @param {JSX.Element, string} props  pass a tbody with the {useGridInfo} hook, and, rowId is the identification of the row to be selected
 * @returns 
 */
export const RowNestedGridExpanded = ({ children, rowId }: IComponentChildren & IComponentId) => {
    // hooks
    const rowExpanded = useGridContext().rowExpanded

    return (
        <AnimatePresence>
            {rowExpanded === rowId ? (
                <motion.tr style={{ overflowY: "hidden", position: "relative" }} initial={{ height: 0, opacity: 0 }} exit={{ height: 0, opacity: 0 }} animate={{ height: 370, opacity: 1 }}>
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

/**
 * Auxiliary component that displays items using the Thead config 
 * @param {any} data info data object - can be used on the rows of the grid
 * @returns 
 */
export const TrGridAuxColumn = ({ data }: { data: any }) => {
    const thead = useGridContext().thead.filter((filt) => filt.param !== "")

    return (
        <>
            {thead.map(({ param, gridfieldValue }, index) => (
                <td key={index}>
                    {{ "amount": formatAmountCo(data[param]), "": data[param] ?? "-" }[gridfieldValue ?? ""]}
                </td>
            ))}
        </>
    )
}

/**
 * Transform a value into COL format money
 * @param {string} value amount value
 * @returns 
 */
function formatAmountCo(value: string) {
    if (!value) return "$ -"
    return "$ " + Intl.NumberFormat("es-CO").format(+value)
}

/**
 * Transform a value into input date format
 * @param value 
 * @returns 
 */
function formatToDate(value: string) {
    if (!value) return "----"
    return dayjs(value).format("DD/MM/YYYY")
}