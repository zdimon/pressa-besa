"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (_a) {
    var allowEmpty = _a.allowEmpty, alwaysOn = _a.alwaysOn, basePath = _a.basePath, component = _a.component, defaultValue = _a.defaultValue, formClassName = _a.formClassName, initialValue = _a.initialValue, initializeForm = _a.initializeForm, input = _a.input, isRequired = _a.isRequired, label = _a.label, limitChoicesToValue = _a.limitChoicesToValue, locale = _a.locale, meta = _a.meta, options = _a.options, optionText = _a.optionText, optionValue = _a.optionValue, record = _a.record, resource = _a.resource, source = _a.source, textAlign = _a.textAlign, translate = _a.translate, translateChoice = _a.translateChoice, rest = __rest(_a, ["allowEmpty", "alwaysOn", "basePath", "component", "defaultValue", "formClassName", "initialValue", "initializeForm", "input", "isRequired", "label", "limitChoicesToValue", "locale", "meta", "options", "optionText", "optionValue", "record", "resource", "source", "textAlign", "translate", "translateChoice"]);
    return rest;
});
