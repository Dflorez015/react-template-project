import { AnimatePresence, motion } from "framer-motion";
import { useContext, useMemo, useRef } from "react"
import { GridContext, ITheadGrid } from "../context"
import { useIsColumnInAction } from "../hooks";
import { FiltersActions, SortActions } from "./actions";
import styles from './grid.module.css';

const GridThead = () => {
    const thead = useContext(GridContext).thead

    const lastColumn = useMemo(() => {
        return thead.filter((columns) => !columns.hiddeColumn).at(-1)!
    }, [thead])

    return (
        <thead>
            <tr>
                {thead.map((th, index) => (
                    <AnimatePresence key={index}>
                        {!th.hiddeColumn && (
                            <ThContent currentTh={th} isLastChild={lastColumn.param === th.param} />
                        )}
                    </AnimatePresence>
                ))}
            </tr>
        </thead>
    )
}

const ThContent = ({ currentTh, isLastChild }: { currentTh: ITheadGrid, isLastChild: boolean }) => {

    const currentFilterColumnOpen = useContext(GridContext).currentFilterColumnOpen

    const ref = useRef<HTMLDivElement>(null)

    return (
        <motion.th style={currentTh.style} data-action={Boolean(currentTh.isAction)}
            initial={{ opacity: 0 }} exit={{ opacity: 0, maxWidth: 0 }} animate={{ opacity: 1, maxWidth: "100%" }}>
            <div className={styles.thead__content} ref={ref}>

                {currentTh.label}

                {!Boolean(currentTh.isAction) && (Boolean(currentTh.filter) || currentTh.canSort) && (
                    <>
                        <TheadActionsButton columnParam={currentTh.param} />

                        <AnimatePresence>
                            {(currentFilterColumnOpen === currentTh.param) ? (

                                <motion.div className={styles.thead__actions} style={{ left: ((ref.current?.clientWidth ?? 0) - 55) ?? 0 }}
                                    initial={{ opacity: 0, y: 0, x: (isLastChild ? "-34%" : 0) }}
                                    exit={{ opacity: 0, y: 15, x: (isLastChild ? "-34%" : 0) }}
                                    animate={{ opacity: 1, y: 22, x: (isLastChild ? "-34%" : 0) }}>
                                    <>
                                        {Boolean(currentTh.canSort) ? <SortActions param={currentTh.param} /> : null}
                                        {currentTh.filter ? <FiltersActions label={currentTh.label} filter={currentTh.filter} /> : null}
                                    </>
                                </motion.div>

                            ) : (null)}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </motion.th>
    )
}

const TheadActionsButton = ({ columnParam }: { columnParam: string }) => {

    const showFilterColumn = useContext(GridContext).showFilterColumn
    const { isInAction } = useIsColumnInAction(columnParam)

    return (
        <svg data-active={isInAction} className={styles.grid__svg__action__button} strokeWidth="0" viewBox="0 0 512 512" onClick={() => showFilterColumn!(columnParam)}>
            <path d="M128 192l128 128 128-128z"></path>
        </svg>
    )
}

export default GridThead