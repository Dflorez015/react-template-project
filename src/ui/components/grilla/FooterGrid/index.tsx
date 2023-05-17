import { LimitSelector } from "./LimitSelector"
import { GridPageSelector } from "./PageSelector"
import styles from "@grilla/grid.module.css"

export const GridFooter = () => {
    return (
        <div className={styles.grid__footer__wrapper}>
            <LimitSelector />
            <div className={styles.division__component__grid} />
            <GridPageSelector />
        </div>
    )
}
