import { useContext, useMemo } from "react"
import { ArrowRightDirection, ColumnsIcon } from "../utils/Icon"
import styles from "@grilla/grid.module.css"
import { GridContext } from "../context"

type IChangeEvent = React.ChangeEvent<HTMLInputElement>

export const useHandleShowColumn = () => {
    const { changeAsideColumnValue, setTheadHiddenValue, showAsideColumnHandler, thead } = useContext(GridContext)

    const button = useMemo(() => {
        return <button className={styles.top__button__action} onClick={changeAsideColumnValue}>
            <ColumnsIcon />
            Columnas
        </button>
    }, [showAsideColumnHandler])

    const arrow = useMemo(() => {
        return <ArrowRightDirection onClick={changeAsideColumnValue} />
    }, [showAsideColumnHandler])

    const changeInput = (e: IChangeEvent) => {
        const { checked, name } = e.target
        setTheadHiddenValue!(thead[+name], !checked)
    }

    return { showAsideColumnHandler, button, thead, arrow, changeInput }
}