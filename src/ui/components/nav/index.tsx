import { useMemo } from "react"
import styles from "./nav.module.css"
import useNavMenu from "./nav.store"

export const NavBarMenu = () => {

    const statusMenu = useNavMenu((state) => state.navMenuStatus)

    const menuStyle = useMemo(() => {
        return statusMenu ? styles.nav__menu__opened__wrapper : styles.nav__menu__closed__wrapper
    }, [statusMenu])

    return (
        <div className={styles.nav__menu + " " + menuStyle}>
            <div className={styles.nav__menu__header} menu-open={`${statusMenu}`}>
                <MenuIcon />
                <input type="text" />
            </div>

            <div className={styles.nav__menu__content}>

            </div>
        </div >
    )
}

const MenuIcon = () => {
    const changeNavMenuStatus = useNavMenu((state) => state.changeNavMenuStatus)
    return (<img src="/nav/arrowMenu.svg" onClick={changeNavMenuStatus} />)
}