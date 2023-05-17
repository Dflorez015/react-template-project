import { createContext, CSSProperties, useContext } from "react";

// json config object ----------------------------------------------------------------

export type signalType = "=" | "contains" | "equal" | "<" | ">" | "<>" | ">=" | "<="
export type filterTextType = "text" | "number" | "date" | "boolean"
export type labelType = "checkbox"
export type fielValueType = "amount"

export interface IFilter {
    signal: signalType
    param: string
    type: filterTextType
    value?: string | number
    groupSignal?: "and" | "or"
}

export interface ITheadGrid {
    label: string;
    param: string;
    style?: CSSProperties
    isAction?: boolean;
    isSearch?: boolean;
    canSort?: boolean;
    hiddeColumn?: boolean;
    filter?: IFilter;
    thComponent?: JSX.Element
    gridfieldValue?: fielValueType
}

// grid props ----------------------------------------------------------------

export interface IContextState {
    url: string
    thead: ITheadGrid[]
}

export interface IGrid extends IContextState {
    children: JSX.Element
    withoutTopActions?: boolean
    withoutBottomActions?: boolean
    gridOptions?: JSX.Element
}

// context function  ----------------------------------------------------------------

export interface IGridFunction {
    changeLimit: (num: number) => void
    changePage: (num: number) => void
    sortByParam: (param: string, desc: boolean) => void
    showFilterColumn: (param: string) => void
    simpleSetFilter: (param: string, signal: signalType, type: filterTextType, value?: string | number) => void
    intervalSetFilter: (newFilters: IFilter[]) => void
    changeAsideColumnValue: () => void
    setTheadHiddenValue: (column: ITheadGrid, value: boolean) => void
    setRowToExpand: (rowId: string) => void
    setCurrentMetadaPagination: (meta: IMetaDataPagination) => void
}

// context state   ----------------------------------------------------------------

export interface ISortType {
    desc: boolean
    selector: string
    [key: string]: boolean | string
}

export interface Ipagination {
    limit?: string
    page?: string
    route?: string
    filt?: IFilter[]
    group?: string
    sort?: ISortType
    [key: string]: string | undefined | ISortType | IFilter[]
}

export interface IPaginationFilterDto {
    route?: string
    page: number
    limit: number
    filt?: string
    group?: string
    sort?: string
    tag?: string
}

export interface IMetaDataPagination {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    __typename?: string;
}

export interface IGridContext extends IContextState, Partial<IGridFunction> {
    paramActionsActive?: string
    pagination?: Ipagination
    currentFilterColumnOpen?: string
    showAsideColumnHandler?: boolean
    rowExpanded?: string
    metaDataPagination?: IMetaDataPagination
}

export const GridContext = createContext<IGridContext>({ url: "", thead: [] });
export const useGridContext = () => useContext(GridContext) as IGridContext & IGridFunction