"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ResponseException = void 0;
var ResponseException = /** @class */ (function (_super) {
    __extends(ResponseException, _super);
    function ResponseException(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.name = 'ResponseException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ResponseException);
        }
        return _this;
    }
    ResponseException.prototype.getStatusCode = function () {
        return this.statusCode;
    };
    return ResponseException;
}(Error));
exports.ResponseException = ResponseException;
