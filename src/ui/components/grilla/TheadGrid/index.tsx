import { useContext, useRef } from "react"
import { GridContext, ITheadGrid } from "../context"
import { useIsColumnInAction } from "../hooks";
import { FiltersActions, SortActions } from "./actions";
import styles from './grid.module.css';

const GridThead = () => {
    const { thead } = useContext(GridContext)

    return (
        <thead>
            <tr>
                {thead.map((th, index) => (
                    !th.hiddeColumn && (
                        <ThContent key={index} currentTh={th} />
                    )
                ))}
            </tr>
        </thead>
    )
}

const ThContent = ({ currentTh }: { currentTh: ITheadGrid }) => {

    const { currentFilterColumnOpen } = useContext(GridContext)

    const ref = useRef<HTMLDivElement>(null)

    return (
        <th style={currentTh.style} data-action={Boolean(currentTh.isAction)} >
            <div className={styles.thead__content} ref={ref}>

                {currentTh.label}

                {!Boolean(currentTh.isAction) && (Boolean(currentTh.filter) || currentTh.canSort) && (
                    <>
                        <TheadActionsButton columnParam={currentTh.param} />

                        {(currentFilterColumnOpen === currentTh.param) ? (
                            <div className={styles.thead__actions} style={{ left: (ref.current!.clientWidth - 55) ?? 0 }}>
                                <>
                                    {Boolean(currentTh.canSort) ? <SortActions param={currentTh.param} /> : null}
                                    {currentTh.filter ? <FiltersActions label={currentTh.label} filter={currentTh.filter} /> : null}
                                </>
                            </div>
                        ) : (null)}
                    </>
                )}
            </div>
        </th>
    )
}

const TheadActionsButton = ({ columnParam }: { columnParam: string }) => {

    const { showFilterColumn } = useContext(GridContext)
    const { isInAction } = useIsColumnInAction(columnParam)

    return (
        <svg data-active={isInAction} className={styles.grid__svg__action__button} strokeWidth="0" viewBox="0 0 512 512" onClick={() => showFilterColumn!(columnParam)}>
            <path d="M128 192l128 128 128-128z"></path>
        </svg>
    )
}

export default GridThead