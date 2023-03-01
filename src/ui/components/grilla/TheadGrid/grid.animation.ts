import { Variant, Variants } from "framer-motion";

export const hiddenColumnAnimation: Variant = {
    minWidth: 0, opacity: 0, transitionEnd: {
        display: "none",
    },
    transition: {
        duration: 0.3,
        opacity: {
            duration: 0.2,
        }
    }
}

export const showColumnAnimation: Variant = {
    display: "table-cell",
    transitionEnd: {
        opacity: 1,
    },
}

export const gridColumnAnimation: Variants = {
    showColumn: showColumnAnimation,
    hiddenColumn: hiddenColumnAnimation
}