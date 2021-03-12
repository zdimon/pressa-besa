import { ComponentType, ReactElement } from 'react';
import { Record, Sort, Pagination } from '../../types';
interface ChildrenFuncParams {
    choices: Record[];
    error?: string;
    loaded: boolean;
    loading: boolean;
    setFilter: (filter: any) => void;
    setPagination: (pagination: Pagination) => void;
    setSort: (sort: Sort) => void;
    warning?: string;
}
interface Props {
    allowEmpty?: boolean;
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactElement;
    filter?: object;
    filterToQuery?: (filter: {}) => any;
    input?: any;
    meta?: object;
    perPage?: number;
    record?: Record;
    reference: string;
    resource: string;
    sort?: Sort;
    source: string;
}
declare const _default: ComponentType<Props>;
export default _default;
