import { FunctionComponent, ReactNode } from 'react';
import { Identifier, RecordMap, Record, Sort } from '../..';
interface ChildrenFuncParams {
    loaded: boolean;
    ids: Identifier[];
    data: RecordMap;
    referenceBasePath: string;
    currentSort: Sort;
}
interface Props {
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactNode;
    record?: Record;
    reference: string;
    resource: string;
    source: string;
}
/**
 * Render prop version of the useReferenceArrayFieldController hook.
 *
 * @see useReferenceArrayFieldController
 */
declare const ReferenceArrayFieldController: FunctionComponent<Props>;
export default ReferenceArrayFieldController;
