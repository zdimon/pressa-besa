import { ReactNode, ComponentType, FunctionComponent } from 'react';
import { Sort, Record } from '../../types';
import { ReferenceInputValue } from './useReferenceInputController';
interface Props {
    allowEmpty?: boolean;
    basePath: string;
    children: (params: ReferenceInputValue) => ReactNode;
    filter?: any;
    filterToQuery?: (filter: string) => any;
    input?: any;
    perPage?: number;
    record?: Record;
    reference: string;
    referenceSource?: (resource: string, source: string) => string;
    resource: string;
    sort?: Sort;
    source: string;
    onChange: () => void;
}
/**
 * Render prop version of the useReferenceInputController hook.
 *
 * @see useReferenceInputController
 */
export declare const ReferenceInputController: FunctionComponent<Props>;
declare const _default: ComponentType<Props>;
export default _default;
