import { motion } from "framer-motion";
import styled from "styled-components";
import { MenuRowGrid } from "@ui/components/styled";
import { RowActionSvg } from "./Icon";

const MenuActionRow = styled(motion.button).attrs(() => ({
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

export const TrActionComponent = ({ children }: { children: JSX.Element }) => {

    return (
        <td style={{ textAlign: "center" }}>
            <MenuRowGrid menuButton={({ open }) => <MenuActionRow $isOpen={open}><RowActionSvg /></MenuActionRow>}>
                <>
                    {children}
                </>
            </MenuRowGrid>
        </td>
    )
}