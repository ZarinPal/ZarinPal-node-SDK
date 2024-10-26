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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ZarinPal = void 0;
var axios_1 = require("axios");
var Payments_1 = require("./resources/Payments");
var Refunds_1 = require("./resources/Refunds");
var Transactions_1 = require("./resources/Transactions");
var Verifications_1 = require("./resources/Verifications");
var Reverses_1 = require("./resources/Reverses");
var Unverified_1 = require("./resources/Unverified");
var Inquiries_1 = require("./resources/Inquiries");
/**
 * Main class for interacting with ZarinPal APIs.
 * Provides access to various resources such as payments, refunds, transactions, etc.
 */
var ZarinPal = /** @class */ (function () {
    /**
     * Creates an instance of ZarinPal.
     * @param {Config} config - The configuration object containing:
     *   - `merchantId` (string): Your merchant ID provided by ZarinPal.
     *   - `accessToken` (string): Access token for authentication (used for GraphQL requests).
     *   - `sandbox` (boolean): Whether to use the sandbox environment.
     */
    function ZarinPal(config) {
        this.config = config;
        this.baseURL = this.config.sandbox
            ? 'https://sandbox.zarinpal.com'
            : 'https://payment.zarinpal.com';
        this.httpClient = axios_1["default"].create({
            baseURL: this.baseURL,
            headers: {
                'User-Agent': 'ZarinPalSdk/v1 (Node.js)',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
        this.graphqlClient = axios_1["default"].create({
            baseURL: 'https://next.zarinpal.com/api/v4/graphql/',
            headers: {
                'User-Agent': 'ZarinPalSdk/v1 (Node.js)',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: "Bearer ".concat(this.config.accessToken)
            }
        });
        this.payments = new Payments_1.Payments(this);
        this.refunds = new Refunds_1.Refunds(this);
        this.transactions = new Transactions_1.Transactions(this);
        this.verifications = new Verifications_1.Verifications(this);
        this.reversals = new Reverses_1.Reversals(this);
        this.unverified = new Unverified_1.Unverified(this);
        this.inquiries = new Inquiries_1.Inquiries(this);
    }
    /**
     * General method for making HTTP requests to ZarinPal's REST API.
     * Automatically includes the merchant ID in the request data.
     * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
     * @param {string} url - The endpoint URL relative to the base URL.
     * @param {any} [data] - The request payload.
     * @returns {Promise<any>} - The response data from the API.
     * @throws {Error} - Throws an error if the request fails.
     */
    ZarinPal.prototype.request = function (method, url, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.request({
                                method: method,
                                url: url,
                                data: __assign({ merchant_id: this.config.merchantId }, data)
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * General method for making GraphQL requests to ZarinPal's API.
     * @param {string} query - The GraphQL query string.
     * @param {any} [variables] - An object containing the variables for the GraphQL query.
     * @returns {Promise<any>} - The response data from the API.
     * @throws {Error} - Throws an error if the request fails.
     */
    ZarinPal.prototype.graphql = function (query, variables) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.graphqlClient.post('', {
                                query: query,
                                variables: variables
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getter for baseURL.
     * @returns {string} - The base URL used for API requests.
     */
    ZarinPal.prototype.getBaseUrl = function () {
        return this.baseURL;
    };
    return ZarinPal;
}());
exports.ZarinPal = ZarinPal;
