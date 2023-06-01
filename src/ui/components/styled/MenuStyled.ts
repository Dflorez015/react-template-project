import { Menu as MenuInner, ControlledMenu, MenuViewScroll, MenuPosition, MenuDirection, MenuAlign } from "@szhsin/react-menu";
import { menuItemSelector, menuSelector } from "@szhsin/react-menu/style-utils";
import styled from "styled-components";

export interface ICustomeMenuSzh  {
    viewScroll?: MenuViewScroll
    position?: MenuPosition
    direction?: MenuDirection
    align?: MenuAlign
}

export const MenuList = styled(MenuInner).attrs(() => ({
    transition: true,
}))`
    ${menuSelector.name} {
        padding-block: 0px;
        box-shadow: var(--shadow);
    }
`;

export const MenuActionList = styled(MenuInner).attrs(() => ({
    transition: true,
}))`
    ${menuSelector.name} {
        background-color: var(--component_bg);
        padding-block: 0px;
        box-shadow: var(--shadow);
        z-index: 2;
    }

    ${menuItemSelector.name} {
        padding-block: 8px;
        padding-inline: 15px;
        display: flex;
        gap: 8px;
        font-family: 'Work Sans', sans-serif;
        font-size: clamp(14px, 2vw, 16px);

        & svg {
            width: 18px;
            height: 18px;
        }
    }

    ${menuItemSelector.disabled} {
        background-color: var(--text_disabled);
        & svg, path {
            fill: var(--stroke_disabled) !important;
        }
    }
`;

export const MenuControlled = styled(ControlledMenu).attrs(() => ({
    transition: true
}))`
    ${menuSelector.name} {
        padding-block: 0px;
        box-shadow: var(--shadow);
    }

    ${menuItemSelector.name} {
        padding-block: 8px;
    }
`;

export const IconInputInfoMenu = styled(ControlledMenu).attrs(() => ({
    arrow: true, direction: "right",
    align: "end", position: "anchor"
}))`
    ${menuSelector.name}{
        padding-inline: 10px;
        width: 340px;
        font-size: 14px;
        box-shadow: var(--shadow);
        border-radius: 10px;

        @media (max-width: 480px) {
            width: 280px;
        }
    }

    ${menuItemSelector.name} {
        padding: 0;
        cursor: default;
    }

    ${menuItemSelector.hover}{
        background-color: var(--component_bg) !important;
    }
`