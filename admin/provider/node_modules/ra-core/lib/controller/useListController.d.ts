import { ReactElement } from 'react';
import { Location } from 'history';
import { ListParams } from '../actions';
import { Sort, RecordMap, Identifier, Record } from '../types';
export interface ListProps {
    filter?: object;
    filters?: ReactElement<any>;
    filterDefaultValues?: object;
    pagination?: ReactElement<any>;
    perPage?: number;
    sort?: Sort;
    basePath: string;
    debounce?: number;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    location?: Location;
    path?: string;
    query: ListParams;
    resource: string;
    [key: string]: any;
}
export interface ListControllerProps<RecordType = Record> {
    basePath: string;
    currentSort: Sort;
    data: RecordMap<RecordType>;
    defaultTitle: string;
    displayedFilters: any;
    filterValues: any;
    hasCreate: boolean;
    hideFilter: (filterName: string) => void;
    ids: Identifier[];
    loading: boolean;
    loaded: boolean;
    onSelect: (ids: Identifier[]) => void;
    onToggleItem: (id: Identifier) => void;
    onUnselectItems: () => void;
    page: number;
    perPage: number;
    resource: string;
    selectedIds: Identifier[];
    setFilters: (filters: any, displayedFilters: any) => void;
    setPage: (page: number) => void;
    setPerPage: (page: number) => void;
    setSort: (sort: string, order?: string) => void;
    showFilter: (filterName: string, defaultValue: any) => void;
    total: number;
    version: number;
}
/**
 * Prepare data for the List view
 *
 * @param {Object} props The props passed to the List component.
 *
 * @return {Object} controllerProps Fetched and computed data for the List view
 *
 * @example
 *
 * import { useListController } from 'react-admin';
 * import ListView from './ListView';
 *
 * const MyList = props => {
 *     const controllerProps = useListController(props);
 *     return <ListView {...controllerProps} {...props} />;
 * }
 */
declare const useListController: <RecordType = Record>(props: ListProps) => ListControllerProps<RecordType>;
export declare const injectedProps: string[];
/**
 * Select the props injected by the useListController hook
 * to be passed to the List children need
 * This is an implementation of pick()
 */
export declare const getListControllerProps: (props: any) => {};
/**
 * Select the props not injected by the useListController hook
 * to be used inside the List children to sanitize props injected by List
 * This is an implementation of omit()
 */
export declare const sanitizeListRestProps: (props: any) => {};
export default useListController;
