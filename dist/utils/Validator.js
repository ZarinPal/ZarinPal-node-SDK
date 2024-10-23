"use strict";
exports.__esModule = true;
exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.validateMerchantId = function (merchantId) {
        if (merchantId === null ||
            !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(merchantId)) {
            throw new Error('Invalid merchant_id format. It should be a valid UUID.');
        }
    };
    Validator.validateAuthority = function (authority) {
        if (!/^[AS][0-9a-zA-Z]{35}$/.test(authority)) {
            throw new Error('Invalid authority format. It should be a string starting with "A" or "S" followed by 35 alphanumeric characters.');
        }
    };
    Validator.validateAmount = function (amount, minAmount) {
        if (minAmount === void 0) { minAmount = 1000; }
        if (amount < minAmount) {
            throw new Error("Amount must be at least ".concat(minAmount, "."));
        }
    };
    Validator.validateCallbackUrl = function (callbackUrl) {
        if (!/^https?:\/\/.*$/.test(callbackUrl)) {
            throw new Error('Invalid callback URL format. It should start with http:// or https://.');
        }
    };
    Validator.validateMobile = function (mobile) {
        if (mobile !== null && !/^09[0-9]{9}$/.test(mobile)) {
            throw new Error('Invalid mobile number format.');
        }
    };
    Validator.validateEmail = function (email) {
        if (email !== null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email format.');
        }
    };
    Validator.validateCurrency = function (currency) {
        var validCurrencies = ['IRR', 'IRT'];
        if (currency !== null && validCurrencies.indexOf(currency) === -1) {
            throw new Error('Invalid currency format. Allowed values are "IRR" or "IRT".');
        }
    };
    Validator.validateWages = function (wages) {
        if (wages !== null) {
            for (var _i = 0, wages_1 = wages; _i < wages_1.length; _i++) {
                var wage = wages_1[_i];
                if (!/^[A-Z]{2}[0-9]{2}[0-9A-Z]{1,30}$/.test(wage.iban)) {
                    throw new Error('Invalid IBAN format in wages.');
                }
                if (wage.amount <= 0) {
                    throw new Error('Wage amount must be greater than zero.');
                }
                if (wage.description.length > 255) {
                    throw new Error('Wage description must be provided and less than 255 characters.');
                }
            }
        }
    };
    Validator.validateTerminalId = function (terminalId) {
        if (!terminalId) {
            throw new Error('Terminal ID is required.');
        }
    };
    Validator.validateFilter = function (filter) {
        var validFilters = ['PAID', 'VERIFIED', 'TRASH', 'ACTIVE', 'REFUNDED'];
        if (filter !== null && validFilters.indexOf(filter) === -1) {
            throw new Error('Invalid filter value.');
        }
    };
    Validator.validateLimit = function (limit) {
        if (limit !== null && limit <= 0) {
            throw new Error('Limit must be a positive integer.');
        }
    };
    Validator.validateOffset = function (offset) {
        if (offset !== null && offset < 0) {
            throw new Error('Offset must be a non-negative integer.');
        }
    };
    Validator.validateCardPan = function (cardPan) {
        if (cardPan !== null && !/^[0-9]{16}$/.test(cardPan)) {
            throw new Error('Invalid card PAN format. It should be a 16-digit number.');
        }
    };
    Validator.validateSessionId = function (sessionId) {
        if (!sessionId) {
            throw new Error('Session ID is required.');
        }
    };
    Validator.validateMethod = function (method) {
        var validMethods = ['PAYA', 'CARD'];
        if (validMethods.indexOf(method) === -1) {
            throw new Error('Invalid method. Allowed values are "PAYA" or "CARD".');
        }
    };
    Validator.validateReason = function (reason) {
        var validReasons = [
            'CUSTOMER_REQUEST',
            'DUPLICATE_TRANSACTION',
            'SUSPICIOUS_TRANSACTION',
            'OTHER'
        ];
        if (validReasons.indexOf(reason) === -1) {
            throw new Error('Invalid reason. Allowed values are "CUSTOMER_REQUEST", "DUPLICATE_TRANSACTION", "SUSPICIOUS_TRANSACTION", or "OTHER".');
        }
    };
    return Validator;
}());
exports.Validator = Validator;
