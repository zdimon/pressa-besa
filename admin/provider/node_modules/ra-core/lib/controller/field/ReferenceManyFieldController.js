"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useReferenceManyFieldController_1 = __importDefault(require("./useReferenceManyFieldController"));
var useSortState_1 = __importDefault(require("../useSortState"));
var usePaginationState_1 = __importDefault(require("../usePaginationState"));
var defaultPerPage = 25;
/**
 * Render prop version of the useReferenceManyFieldController hook.
 *
 * @see useReferenceManyFieldController
 */
exports.ReferenceManyFieldController = function (_a) {
    var resource = _a.resource, reference = _a.reference, record = _a.record, target = _a.target, filter = _a.filter, source = _a.source, basePath = _a.basePath, initialPerPage = _a.perPage, initialSort = _a.sort, children = _a.children;
    var _b = useSortState_1.default(initialSort), sort = _b.sort, setSortField = _b.setSortField;
    var _c = usePaginationState_1.default({
        perPage: initialPerPage || defaultPerPage,
    }), page = _c.page, perPage = _c.perPage, setPage = _c.setPage, setPerPage = _c.setPerPage;
    var _d = useReferenceManyFieldController_1.default({
        resource: resource,
        reference: reference,
        record: record,
        target: target,
        filter: filter,
        source: source,
        basePath: basePath,
        perPage: perPage,
        page: page,
        sort: sort,
    }), data = _d.data, ids = _d.ids, loaded = _d.loaded, referenceBasePath = _d.referenceBasePath, total = _d.total;
    return children({
        currentSort: sort,
        data: data,
        ids: ids,
        loaded: loaded,
        page: page,
        perPage: perPage,
        referenceBasePath: referenceBasePath,
        setPage: setPage,
        setPerPage: setPerPage,
        setSort: setSortField,
        total: total,
    });
};
exports.default = exports.ReferenceManyFieldController;
