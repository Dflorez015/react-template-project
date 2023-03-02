import { Menu as MenuInner } from "@szhsin/react-menu";
import { menuSelector } from "@szhsin/react-menu/style-utils";
import { motion } from "framer-motion";
import styled from "styled-components";

export const MenuList = styled(MenuInner).attrs(() => ({
    transition: true
}))`
    ${menuSelector.name} {
        padding-block: 0px;
        margin-top: 5px !important;
        box-shadow: var(--shadow);
    }
`;

export const MenuRowGrid = styled(MenuInner).attrs(() => ({
    transition: true,
    direction:"right"
}))`
    ${menuSelector.name} {
        padding-block: 0px;
        margin-left: 5px !important;
        box-shadow: var(--shadow);
    }
`;

export const MenuActionRow = styled(motion.button).attrs(() => ({
    type: "button",
})) <{ $isOpen: boolean }>`
    height: 30px;
    width: 30px;
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
        background-color: var(--main_color_a2);

        & > svg {
            fill: var(--main_color);
        }
    `: `
        :hover {
            box-shadow: var(--shadow);
        }
    `}
`