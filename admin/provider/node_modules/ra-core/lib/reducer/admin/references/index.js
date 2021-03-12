"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var oneToMany_1 = __importDefault(require("./oneToMany"));
var possibleValues_1 = __importStar(require("./possibleValues"));
var defaultReducer = function () { return null; };
exports.default = redux_1.combineReducers({
    /**
     * ts-jest does some aggressive module mocking when unit testing reducers individually.
     * To avoid 'No reducer provided for key "..."' warnings,
     * we pass default reducers. Sorry for legibility.
     *
     * @see https://stackoverflow.com/questions/43375079/redux-warning-only-appearing-in-tests
     */
    oneToMany: oneToMany_1.default || defaultReducer,
    possibleValues: possibleValues_1.default || defaultReducer,
});
exports.getPossibleReferenceValues = function (state, props) {
    return possibleValues_1.getPossibleReferenceValues(state.possibleValues, props);
};
exports.getPossibleReferences = possibleValues_1.getPossibleReferences;
