"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var translate_1 = __importDefault(require("./translate"));
exports.translate = translate_1.default;
var TranslationContext_1 = require("./TranslationContext");
exports.TranslationContext = TranslationContext_1.TranslationContext;
var TranslationProvider_1 = __importDefault(require("./TranslationProvider"));
exports.TranslationProvider = TranslationProvider_1.default;
var TestTranslationProvider_1 = __importDefault(require("./TestTranslationProvider"));
exports.TestTranslationProvider = TestTranslationProvider_1.default;
var useLocale_1 = __importDefault(require("./useLocale"));
exports.useLocale = useLocale_1.default;
var useSetLocale_1 = __importDefault(require("./useSetLocale"));
exports.useSetLocale = useSetLocale_1.default;
var useTranslate_1 = __importDefault(require("./useTranslate"));
exports.useTranslate = useTranslate_1.default;
// Alias to translate to avoid shadowed variable names error with tslint
var withTranslate = translate_1.default;
exports.withTranslate = withTranslate;
exports.DEFAULT_LOCALE = 'en';
__export(require("./TranslationUtils"));
__export(require("./TranslationContext"));
