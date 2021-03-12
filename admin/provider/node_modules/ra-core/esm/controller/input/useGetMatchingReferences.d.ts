import { Pagination, Sort, Record, Filter } from '../../types';
interface UseMatchingReferencesOption {
    reference: string;
    referenceSource: (resource: string, source: string) => string;
    resource: string;
    source: string;
    filter: Filter;
    pagination: Pagination;
    sort: Sort;
    id: string;
}
interface UseMatchingReferencesProps {
    error?: string;
    matchingReferences?: Record[];
    loading: boolean;
}
declare const _default: ({ reference, referenceSource, resource, source, filter, pagination, sort, id, }: UseMatchingReferencesOption) => UseMatchingReferencesProps;
export default _default;
