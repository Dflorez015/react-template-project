import { useContext } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { GridContext } from "../context";
import { PaginationBackArrow, PaginationNextArrow } from "../utils/Icon";

const StylePaginate = styled(ReactPaginate)`
display: flex;
& li {
    width: 35px;
    text-align: right;
    display: flex;
    justify-content: right;
    a {
        cursor: pointer;
        min-width: 25px;
        text-align: center;
        padding-block: 3px;
        border-radius: 50%;
        font-family: Roboto, sans-serif;
        transition: background-color , color .4s ease-in-out;
        :hover {
            box-shadow: 2px 3px 6px var(--border_shadow_sm);
        }
    }
}

.previous__btn, .next__btn{
    & a {
        background-color: var(--main_color_a2);
        color: var(--stroke_color);
        border-radius: 50%;
        background-color: transparent;
        padding: 5px 5px 2px 5px;
        & svg {
            height: 15px;
            width: 15px;
        }
    }
}

.page__active a{
    background-color: var(--main_color);
    color: white;
    transition: box-shadow .2s linear;
    :hover {
        background-color: var(--contrary_main_color);
    }
}

.page__disabled a{
    cursor: context-menu;
    background-color: var(--stroke_disabled);
    color: var(--border_color) !important;
    :hover{
        box-shadow: none !important;
    }
}
`

const pagination = {
    currentPage: 1,
    totalPages: 4
}

export const GridPageSelector = () => {

    const changePage = useContext(GridContext).changePage!
    const page = useContext(GridContext).pagination?.page ?? 1

    const handlePageClick = ({ selected }: { selected: number }) => {
        changePage(selected + 1)
    }

    return (
        <div>
            <div className="pagination__legend">
                Página {page} de {pagination.totalPages}
            </div>

            <StylePaginate
                breakLabel="..."
                nextLabel={<PaginationNextArrow />}
                previousLabel={<PaginationBackArrow />}
                onPageChange={handlePageClick}
                forcePage={+page - 1}
                pageCount={pagination.totalPages}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                activeClassName="page__active"
                disabledClassName="page__disabled"
                previousClassName="previous__btn"
                nextClassName="next__btn"
            />
        </div>
    )
}