import { motion } from "framer-motion"
import { useMemo } from "react"
import styles from "./nav.module.css"
import useNavMenu from "./nav.store"

export const NavBarMenu = () => {

    const statusMenu = useNavMenu((state) => state.navMenuStatus)

    const { navAnimate, styleNav } = useMemo(() => {
        const styleNav = statusMenu ? styles.nav__menu__opened__wrapper : styles.nav__menu__closed__wrapper
        const navAnimate = statusMenu ? { width: 300, height: "100vh" } : { width: 60, height: "fit-content" }
        
        return { styleNav, navAnimate }
    }, [statusMenu])

    return (
        <motion.div className={styles.nav__menu + " " + styleNav}
            animate={navAnimate}>
            <div className={styles.nav__menu__header} menu-open={`${statusMenu}`}>
                <MenuIcon />
                <input type="text" />
            </div>

            <div className={styles.nav__menu__content}>

            </div>
        </motion.div >
    )
}

const MenuIcon = () => {
    const changeNavMenuStatus = useNavMenu((state) => state.changeNavMenuStatus)
    return (<img src="/nav/arrowMenu.svg" onClick={changeNavMenuStatus} />)
}