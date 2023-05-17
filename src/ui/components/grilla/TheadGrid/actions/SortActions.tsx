import { useMemo } from "react"
import { useGridContext } from "../../context"
import styles from "@grilla/grid.module.css"

/*----------------------------------------- interfaces -----------------------------------------*/
interface ISortProps { param: string }

/*----------------------------------------- components -----------------------------------------*/
/**
 * Action than set the order configuration of the grid
 * @param {ISortProps} props name column 
 * @returns 
 */
export const SortActions = ({ param }: ISortProps) => {
    const { sortByParam, pagination } = useGridContext()

    const sortActionsElements = useMemo(() => {
        const sort = pagination?.sort
        let ascState, descState

        if (sort && sort.selector === param) {
            sort.desc ? (ascState = false, descState = true) : (ascState = true, descState = false)
        }

        return (
            <div className={styles.actions__wrapper} style={{ gap: "10px" }}>
                <label>Ordenar información</label>
                <div className={styles.actions__wrapper}>
                    <div className={styles.row__actions__wrapper} data-active={ascState} onClick={() => sortByParam!(param, false)}>
                        <AscIcon /> Orden ascendente
                    </div>
                    <div className={styles.row__actions__wrapper} data-active={descState} onClick={() => sortByParam!(param, true)}>
                        <DescIcon /> Orden descendente
                    </div>
                </div>
            </div>
        )

    }, [pagination?.sort, param])

    return sortActionsElements
}

const AscIcon = () => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1em" height="1em">
            <path d="M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
        </svg>
    )
}

const DescIcon = () => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1em" height="1em">
            <path d="M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
        </svg>
    )
}