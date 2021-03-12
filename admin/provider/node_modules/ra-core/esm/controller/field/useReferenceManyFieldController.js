import get from 'lodash/get';
import { useGetManyReference } from '../../dataProvider';
import { useNotify } from '../../sideEffect';
var defaultFilter = {};
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
var useReferenceManyFieldController = function (_a) {
    var resource = _a.resource, reference = _a.reference, record = _a.record, target = _a.target, _b = _a.filter, filter = _b === void 0 ? defaultFilter : _b, source = _a.source, basePath = _a.basePath, page = _a.page, perPage = _a.perPage, _c = _a.sort, sort = _c === void 0 ? { field: 'id', order: 'DESC' } : _c;
    var referenceId = get(record, source);
    var notify = useNotify();
    var _d = useGetManyReference(reference, target, referenceId, { page: page, perPage: perPage }, sort, filter, resource, {
        onFailure: function (error) {
            return notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
        },
    }), data = _d.data, ids = _d.ids, total = _d.total, loading = _d.loading, loaded = _d.loaded;
    var referenceBasePath = basePath.replace(resource, reference);
    return {
        data: data,
        ids: ids,
        loaded: loaded,
        loading: loading,
        referenceBasePath: referenceBasePath,
        total: total,
    };
};
export default useReferenceManyFieldController;
