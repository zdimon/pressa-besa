import { Record, RecordMap, Identifier } from '../../types';
/**
 * @typedef ReferenceArrayProps
 * @type {Object}
 * @property {Array} ids the list of ids.
 * @property {Object} data Object holding the reference data by their ids
 * @property {Object} error the error returned by the dataProvider
 * @property {boolean} loading is the reference currently loading
 * @property {boolean} loaded has the reference already been loaded
 * @property {string} referenceBasePath basePath of the reference
 */
export interface ReferenceArrayProps {
    ids: Identifier[];
    data: RecordMap;
    error?: any;
    loading: boolean;
    loaded: boolean;
    referenceBasePath: string;
}
interface Option {
    basePath: string;
    record?: Record;
    reference: string;
    resource: string;
    source: string;
}
/**
 * Hook that fetches records from another resource specified
 * by an array of *ids* in current record.
 *
 * @example
 *
 * const { ids, data, error, loaded, loading, referenceBasePath } = useReferenceArrayFieldController({
 *      basePath: 'resource';
 *      record: { referenceIds: ['id1', 'id2']};
 *      reference: 'reference';
 *      resource: 'resource';
 *      source: 'referenceIds';
 * });
 *
 * @param {Object} option
 * @param {string} option.basePath basepath to current resource
 * @param {Object} option.record The The current resource record
 * @param {string} option.reference The linked resource name
 * @param {string} option.resource The current resource name
 * @param {string} option.source The key of the linked resource identifier
 *
 * @returns {ReferenceArrayProps} The reference props
 */
declare const useReferenceArrayFieldController: ({ resource, reference, basePath, record, source, }: Option) => ReferenceArrayProps;
export default useReferenceArrayFieldController;
