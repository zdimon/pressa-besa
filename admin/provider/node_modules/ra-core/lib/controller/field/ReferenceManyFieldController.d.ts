import { ReactElement, FunctionComponent } from 'react';
import { Record, Sort, RecordMap, Identifier } from '../../types';
interface ChildrenFuncParams {
    currentSort: Sort;
    data: RecordMap;
    ids: Identifier[];
    loaded: boolean;
    page: number;
    perPage: number;
    referenceBasePath: string;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    setSort: (field: string) => void;
    total: number;
}
interface Props {
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactElement<ChildrenFuncParams>;
    filter?: any;
    perPage?: number;
    record?: Record;
    reference: string;
    resource: string;
    sort?: Sort;
    source: string;
    target: string;
    total?: number;
}
/**
 * Render prop version of the useReferenceManyFieldController hook.
 *
 * @see useReferenceManyFieldController
 */
export declare const ReferenceManyFieldController: FunctionComponent<Props>;
export default ReferenceManyFieldController;
