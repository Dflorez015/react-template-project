import { createContext, CSSProperties } from "react";

export type signalType = "=" | "contain" | "equal" | "<" | ">" | "<>" | ">=" | "<="
export type filterTextType = "text" | "number" | "date"

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
    canSort?: boolean;
    filter?: IFilter;
}

export interface IContextState {
    url: string
    thead: ITheadGrid[]
}

export interface IGrid extends IContextState {
    children: JSX.Element
}

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
}

export interface IGridContext extends IContextState {
    paramActionsActive?: string
    pagination?: Ipagination
    currentFilterColumnOpen?: string
    changeLimit?: (num: number) => void
    changePage?: (num: number) => void
    sortByParam?: (param: string, desc: boolean) => void
    showFilterColumn?: (param: string) => void
    simpleSetFilter?: (param: string, signal: signalType, type: filterTextType, value?: string | number) => void
    intervalSetFilter?: (newFilters: IFilter[]) => void
}

export const GridContext = createContext<IGridContext>({ url: "", thead: [] });