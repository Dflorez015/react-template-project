import { useContext } from "react"
import styled from "styled-components"
import { GridContext } from "../context"


const LimitWrapper = styled.div<{ $active: boolean }>`
cursor: pointer;
font-family: Roboto, sans-serif;
padding: 5px;
text-align: center;
border-radius: 20px;
transition: background-color, color .2s ease-in-out;

${({ $active }) => $active ? `
    background-color: var(--main_color);
    color: white !important;
    cursor: default;
    pointer-events: none;
    `: `
    :hover {
        transition: box-shadow .2s ease-in;
        box-shadow: 2px 3px 6px var(--border_shadow_sm);
    }
`}
`

const limits = [20, 50, 100, 200]

export const LimitSelector = () => {

    const changeLimit = useContext(GridContext).changeLimit!
    const gridLimit = useContext(GridContext).pagination?.limit ?? 20

    return (
        <div>
            {limits.map(limit => (
                <LimitWrapper key={limit} $active={limit == gridLimit} onClick={() => changeLimit(limit)}>
                    {limit}
                </LimitWrapper>
            ))}
        </div>
    )
}
