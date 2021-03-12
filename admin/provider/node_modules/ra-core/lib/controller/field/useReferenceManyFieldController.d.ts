import { Record, Sort, RecordMap, Identifier } from '../../types';
/**
 * @typedef ReferenceManyProps
 * @type {Object}
 * @property {Array} data: the referenced records dictionary by their ids.
 * @property {Array} ids: the list of referenced records ids.
 * @property {boolean} loaded: boolean indicating if the references has already be loaded loaded
 * @property {string | false} referenceBasePath base path of the related record
 * @property {number} total records
 */
export interface ReferenceManyProps {
    data: RecordMap;
    ids: Identifier[];
    loaded: boolean;
    loading: boolean;
    referenceBasePath: string;
    total: number;
}
interface Options {
    basePath: string;
    data?: RecordMap;
    filter?: any;
    ids?: any[];
    loaded?: boolean;
    page: number;
    perPage: number;
    record?: Record;
    reference: string;
    resource: string;
    sort?: Sort;
    source: string;
    target: string;
    total?: number;
}
/**
 * Fetch reference records, and return them when avaliable
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 *
 * const { loaded, referenceRecord, resourceLinkPath } = useReferenceManyFieldController({
 *     resource
 *     reference: 'users',
 *     record: {
 *         userId: 7
 *     }
 *     target: 'comments',
 *     source: 'userId',
 *     basePath: '/comments',
 *     page: 1,
 *     perPage: 25,
 * });
 *
 * @param {Object} option
 * @param {string} option.resource The current resource name
 * @param {string} option.reference The linked resource name
 * @param {Object} option.record The current resource record
 * @param {string} option.target The target resource key
 * @param {Object} option.filter The filter applied on the recorded records list
 * @param {string} option.source The key of the linked resource identifier
 * @param {string} option.basePath basepath to current resource
 * @param {number} option.page the page number
 * @param {number} option.perPage the number of item per page
 * @param {Object} option.sort the sort to apply to the referenced records
 *
 * @returns {ReferenceManyProps} The reference many props
 */
declare const useReferenceManyFieldController: ({ resource, reference, record, target, filter, source, basePath, page, perPage, sort, }: Options) => ReferenceManyProps;
export default useReferenceManyFieldController;
