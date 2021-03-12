"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = __importDefault(require("./reducer"));
exports.createAppReducer = reducer_1.default;
var admin_1 = __importDefault(require("./reducer/admin"));
exports.adminReducer = admin_1.default;
var queryReducer_1 = __importDefault(require("./reducer/admin/resource/list/queryReducer"));
exports.queryReducer = queryReducer_1.default;
__export(require("./core"));
__export(require("./actions"));
__export(require("./auth"));
__export(require("./dataProvider"));
__export(require("./export"));
__export(require("./i18n"));
__export(require("./inference"));
__export(require("./loading"));
__export(require("./util"));
__export(require("./controller"));
__export(require("./form"));
var reducer_2 = require("./reducer");
exports.getResources = reducer_2.getResources;
exports.getReferenceResource = reducer_2.getReferenceResource;
exports.getNotification = reducer_2.getNotification;
exports.getPossibleReferences = reducer_2.getPossibleReferences;
exports.getPossibleReferenceValues = reducer_2.getPossibleReferenceValues;
var oneToMany_1 = require("./reducer/admin/references/oneToMany");
exports.getIds = oneToMany_1.getIds;
exports.getReferences = oneToMany_1.getReferences;
exports.getReferencesByIds = oneToMany_1.getReferencesByIds;
exports.nameRelatedTo = oneToMany_1.nameRelatedTo;
__export(require("./sideEffect"));
__export(require("./types"));
