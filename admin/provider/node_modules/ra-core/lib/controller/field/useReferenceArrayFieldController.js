"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var get_1 = __importDefault(require("lodash/get"));
var dataProvider_1 = require("../../dataProvider");
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
var useReferenceArrayFieldController = function (_a) {
    var resource = _a.resource, reference = _a.reference, basePath = _a.basePath, record = _a.record, source = _a.source;
    var ids = get_1.default(record, source) || [];
    var _b = dataProvider_1.useGetMany(reference, ids), data = _b.data, error = _b.error, loading = _b.loading, loaded = _b.loaded;
    var referenceBasePath = basePath.replace(resource, reference); // FIXME obviously very weak
    return {
        ids: ids,
        data: react_1.useMemo(function () { return indexById(data); }, [data]),
        error: error,
        loaded: loaded,
        loading: loading,
        referenceBasePath: referenceBasePath,
    };
};
var indexById = function (records) {
    if (records === void 0) { records = []; }
    return records
        .filter(function (r) { return typeof r !== 'undefined'; })
        .reduce(function (prev, current) {
        prev[current.id] = current;
        return prev;
    }, {});
};
exports.default = useReferenceArrayFieldController;
