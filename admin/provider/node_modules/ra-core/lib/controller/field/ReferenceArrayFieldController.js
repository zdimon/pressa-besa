"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useReferenceArrayFieldController_1 = __importDefault(require("./useReferenceArrayFieldController"));
/**
 * Render prop version of the useReferenceArrayFieldController hook.
 *
 * @see useReferenceArrayFieldController
 */
var ReferenceArrayFieldController = function (_a) {
    var resource = _a.resource, reference = _a.reference, basePath = _a.basePath, record = _a.record, source = _a.source, children = _a.children;
    return children(__assign({ currentSort: {
            field: 'id',
            order: 'ASC',
        } }, useReferenceArrayFieldController_1.default({
        resource: resource,
        reference: reference,
        basePath: basePath,
        record: record,
        source: source,
    })));
};
exports.default = ReferenceArrayFieldController;
