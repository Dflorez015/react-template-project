import { motion } from "framer-motion";
import styled from "styled-components";

export const MenuActionRow = styled(motion.button).attrs(() => ({
    type: "button",
})) <{ $isOpen: boolean }>`
    height: 30px !important;
    width: 30px !important;
    padding: 0 !important;
    margin-block: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: auto;
    border-radius: 18px;
    
    /* custome */
    
    transition: box-shadow .2s ease-in,  background-color .2s linear;

    & > svg {
        height: .9rem;
        width: .9rem;
        fill: var(--stroke_color);
    }

    ${({ $isOpen }) => $isOpen ? `
        box-shadow: inset 0px 0px 5px #c1c1c1;
        background-color: var(--opacity_main_color);

        & > svg {
            fill: var(--contrary_main_color);
        }
    `: `
        :hover {
            box-shadow: var(--shadow);
        }
    `}
`