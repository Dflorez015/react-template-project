import { useContext, useMemo } from "react"
import styles from "@components/grilla/TheadGrid/grid.module.css"
import { GridContext } from "../context"

export const useHandleShowColumn = () => {
    const { changeAsideColumnValue, showAsideColumnHandler } = useContext(GridContext)

    const button = useMemo(() => {
        return <button className={styles.top__button__action} onClick={changeAsideColumnValue}>
            Columnas
        </button>
    }, [])

    return { showAsideColumnHandler, button }
}