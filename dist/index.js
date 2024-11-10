"use strict";
exports.__esModule = true;
var Zarinpal_1 = require("./Zarinpal");
exports["default"] = Zarinpal_1.ZarinPal;
module.exports = Zarinpal_1.ZarinPal;
// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.ZarinPal = Zarinpal_1.ZarinPal;
// Allow use with the TypeScript compiler without `esModuleInterop`.
// We may also want to add `Object.defineProperty(exports, "__esModule", {value: true});` in the future, so that Babel users will use the `default` version.
module.exports["default"] = Zarinpal_1.ZarinPal;
