import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { PaginationBackArrow, PaginationNextArrow } from "../utils/Icon";
import styles from "@grilla/grid.module.css"
import { useGridContext } from "../context";

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
        font-family: 'Work Sans',sans-serif;
        transition: background-color , color .4s ease-in-out;
        :hover {
            box-shadow: 2px 3px 6px var(--border_shadow_sm);
        }
    }
}

.previous__button, .next__button{
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
    color: var(--reverse_stroke_color);
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

export const GridPageSelector = () => {
    // hooks
    const changePage = useGridContext().changePage
    const page = useGridContext().pagination?.page ?? 1
    const metaDataPagination = useGridContext().metaDataPagination

    // functions
    const handlePageClick = ({ selected }: { selected: number }) => {
        changePage(selected + 1)
    }

    return (
        <div>
            <div className={styles.pagination__legend}>
                Página {page} de {metaDataPagination?.totalPages ?? 1}
            </div>

            <StylePaginate
                breakLabel="..."
                nextLabel={<PaginationNextArrow />}
                previousLabel={<PaginationBackArrow />}
                onPageChange={handlePageClick}
                forcePage={(metaDataPagination?.currentPage || 1) - 1}
                pageCount={metaDataPagination?.totalPages || 1}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                activeClassName="page__active"
                disabledClassName="page__disabled"
                previousClassName="previous__button"
                nextClassName="next__button"
            />
        </div>
    )
}