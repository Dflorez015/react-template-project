import { Menu as MenuInner } from "@szhsin/react-menu";
import { menuSelector } from "@szhsin/react-menu/style-utils";
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