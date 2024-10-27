"use strict";
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
exports.Payments = void 0;
var Validator_1 = require("../utils/Validator");
/**
 * Class representing the Payments resource for creating payment requests.
 */
var Payments = /** @class */ (function () {
    /**
     * Creates an instance of Payments.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    function Payments(zarinpal) {
        this.endpoint = '/pg/v4/payment/request.json';
        this.startPayUrl = '/pg/StartPay/';
        this.zarinpal = zarinpal;
    }
    /**
     * Create a payment request.
     * @param {Object} data - The payment request data.
     * @param {number} data.amount - The amount to be paid (minimum 1000).
     * @param {string} data.callback_url - The URL to redirect to after payment.
     * @param {string} data.description - A description of the payment.
     * @param {string} [data.mobile] - The customer's mobile number (optional).
     * @param {string} [data.email] - The customer's email address (optional).
     * @param {string|string[]} [data.cardPan] - Allowed card PAN(s) for the payment (optional).
     * @param {string} [data.referrer_id] - The referrer ID (optional).
     * @returns {Promise<any>} - The response from the API.
     * @throws {Error} - Throws an error if validation fails or the API call fails.
     */
    Payments.prototype.create = function (data) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _i, _d, card;
            return __generator(this, function (_e) {
                // Validate input data
                Validator_1.Validator.validateAmount(data.amount);
                Validator_1.Validator.validateCallbackUrl(data.callback_url);
                Validator_1.Validator.validateMobile((_a = data.mobile) !== null && _a !== void 0 ? _a : null);
                Validator_1.Validator.validateEmail((_b = data.email) !== null && _b !== void 0 ? _b : null);
                if (Array.isArray(data.cardPan)) {
                    for (_i = 0, _d = data.cardPan; _i < _d.length; _i++) {
                        card = _d[_i];
                        Validator_1.Validator.validateCardPan(card);
                    }
                }
                else {
                    Validator_1.Validator.validateCardPan((_c = data.cardPan) !== null && _c !== void 0 ? _c : null);
                }
                // Make the API request
                return [2 /*return*/, this.zarinpal.request('POST', this.endpoint, data)];
            });
        });
    };
    /**
     * Get the redirect URL for the payment.
     * @param {string} authority - The authority code returned from create request.
     * @returns {string} - The full redirect URL.
     */
    Payments.prototype.getRedirectUrl = function (authority) {
        var baseUrl = this.zarinpal.getBaseUrl(); // Use getBaseUrl()
        return "".concat(baseUrl).concat(this.startPayUrl).concat(authority);
    };
    return Payments;
}());
exports.Payments = Payments;
