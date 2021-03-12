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
var useDataProvider_1 = __importDefault(require("./useDataProvider"));
var react_1 = require("react");
var useDeclarativeSideEffects_1 = __importDefault(require("./useDeclarativeSideEffects"));
/**
 * This version of the useDataProvider hook ensure Query and Mutation components are still usable
 * with side effects declared as objects.
 *
 * @deprecated This is for backward compatibility only and will be removed in next major version.
 */
var useDataProviderWithDeclarativeSideEffects = function () {
    var dataProvider = useDataProvider_1.default();
    var getSideEffects = useDeclarativeSideEffects_1.default();
    var dataProviderProxy = react_1.useMemo(function () {
        return new Proxy(dataProvider, {
            get: function (target, name) {
                if (typeof name === 'symbol') {
                    return;
                }
                return function (resource, payload, options) {
                    var _a = getSideEffects(resource, options), onSuccess = _a.onSuccess, onFailure = _a.onFailure;
                    try {
                        return target[name.toString()](resource, payload, __assign(__assign({}, options), { onSuccess: onSuccess,
                            onFailure: onFailure }));
                    }
                    catch (e) {
                        // turn synchronous exceptions (e.g. in parameter preparation)
                        // into async ones, otherwise they'll be lost
                        return Promise.reject(e);
                    }
                };
            },
        });
    }, [dataProvider, getSideEffects]);
    return dataProviderProxy;
};
exports.default = useDataProviderWithDeclarativeSideEffects;
