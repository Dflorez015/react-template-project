import { useMemo } from "react";
import { Variants, motion } from "framer-motion";
import { useGridContext } from "../context";

export const gridContainerAnimation: Variants = {
    hidden: { opacity: 0, height: 0 },
    show: {
        height: "auto",
        opacity: 1,
        transition: {
            when: "beforeChildren",
            delayChildren: 0.05,
            staggerChildren: 0.1,
            height: { duration: 0.1 },
        },
    },
    exit: { opacity: 0, transition: { duration: 0.1, when: "afterChildren" } }
}


const trAnimation = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 }
}

/**
 * util loading component from the Grilla
 */
export const UtilLoadingTbody = () => {
    const thead = useGridContext().thead

    const TdSkeleton = useMemo(() => {
        let tr = thead.map((_, index) => (
            <td key={index} style={{ paddingBlock: 0 }}><div className="skeleton__loading" style={{ width: "100%", height: 25 }} /></td>
        ))
        return ([...tr])
    }, [thead])

    return (
        <motion.tbody variants={gridContainerAnimation} animate="show" initial="hidden" exit="exit">
            <motion.tr variants={trAnimation}>{TdSkeleton}</motion.tr>
            <motion.tr variants={trAnimation}>{TdSkeleton}</motion.tr>
            <motion.tr variants={trAnimation}>{TdSkeleton}</motion.tr>
            <motion.tr variants={trAnimation}>{TdSkeleton}</motion.tr>
            <motion.tr variants={trAnimation}>{TdSkeleton}</motion.tr>
        </motion.tbody>
    )
}

/**
 * util error component from the Grilla
 * @param errMsn {string} msn error to show 
 * @returns 
 */
export const UtilErrorTbody = ({ errMsn }: { errMsn: string }) => {
    return (
        <motion.tbody variants={gridContainerAnimation} animate="show" initial="hidden" exit="exit">
            <motion.tr variants={trAnimation} style={{ position: "relative", height: 150 }}>
                <td>
                    <h4 style={{ color: "red", width: "100%", textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                        {errMsn}
                    </h4>
                </td>
            </motion.tr>
        </motion.tbody>
    )
}

/**
 * util layout empty data component from the Grilla
 * @param children {JSX.Element} msn to show
 * @returns 
 */
export const UtilLayoutEmptyDataTbody = ({ children }: { children: JSX.Element }) => {
    return (
        <motion.tbody variants={gridContainerAnimation} animate="show" initial="hidden" exit="exit">
            <motion.tr variants={trAnimation} style={{ position: "relative", height: 150 }}>
                <td>
                    {children}
                </td>
            </motion.tr>
        </motion.tbody>
    )
}