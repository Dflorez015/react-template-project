import styled from "styled-components"
import { LimitSelector } from "./LimitSelector"
import { GridPageSelector } from "./PageSelector"

const GridFooterWrapper = styled.div`
    position: relative;
    padding: 0.6rem 0.6rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;

    /*--- custome ---*/
    border-radius: 15px;
    box-shadow: var(--shadow);
    background-color: var(--component_bg);

    & > div {
        display: flex;
        gap: .2rem;
        align-items: center;
    }

    .pagination__legend {
        font-family: Roboto, sans-serif;
    }

    .paginate__division {
        height: 100%;
        border-left: 1px solid var(--border_color);
        border-radius: 5px;
        padding-right: 5px;
    }
`

export const GridFooter = () => {
    return (
        <GridFooterWrapper>
            <LimitSelector />
            <div className="paginate__division"></div>
            <GridPageSelector />
        </GridFooterWrapper>
    )
}
