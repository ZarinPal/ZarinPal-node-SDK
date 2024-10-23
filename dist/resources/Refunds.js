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
exports.Refunds = void 0;
var Validator_1 = require("../utils/Validator");
/**
 * Class representing the Refunds resource for handling refund operations via GraphQL.
 */
var Refunds = /** @class */ (function () {
    /**
     * Creates an instance of Refunds.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    function Refunds(zarinpal) {
        this.zarinpal = zarinpal;
    }
    /**
     * Create a refund request via GraphQL.
     * @param {Object} data - The refund request data.
     * @param {string} data.sessionId - The session ID of the transaction to refund.
     * @param {number} data.amount - The amount to refund.
     * @param {string} [data.description] - A description for the refund (optional).
     * @param {string} [data.method] - The refund method, e.g., 'PAYA' or 'CARD' (optional).
     * @param {string} [data.reason] - The reason for the refund, e.g., 'CUSTOMER_REQUEST' (optional).
     * @returns {Promise<any>} - The response from the GraphQL API.
     * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
     */
    Refunds.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var query, variables;
            return __generator(this, function (_a) {
                // Validate input data
                Validator_1.Validator.validateSessionId(data.sessionId);
                Validator_1.Validator.validateAmount(data.amount);
                if (data.method) {
                    Validator_1.Validator.validateMethod(data.method);
                }
                if (data.reason) {
                    Validator_1.Validator.validateReason(data.reason);
                }
                query = "\n      mutation AddRefund(\n        $session_id: ID!,\n        $amount: BigInteger!,\n        $description: String,\n        $method: InstantPayoutActionTypeEnum,\n        $reason: RefundReasonEnum\n      ) {\n        resource: AddRefund(\n          session_id: $session_id,\n          amount: $amount,\n          description: $description,\n          method: $method,\n          reason: $reason\n        ) {\n          terminal_id,\n          id,\n          amount,\n          timeline {\n            refund_amount,\n            refund_time,\n            refund_status\n          }\n        }\n      }\n    ";
                variables = {
                    session_id: data.sessionId,
                    amount: data.amount,
                    description: data.description,
                    method: data.method,
                    reason: data.reason
                };
                // Make the GraphQL request
                return [2 /*return*/, this.zarinpal.graphql(query, variables)];
            });
        });
    };
    /**
     * Retrieve details of a specific refund.
     * @param {string} refundId - The ID of the refund to retrieve.
     * @returns {Promise<any>} - The response containing refund details.
     * @throws {Error} - Throws an error if the API call encounters an error.
     */
    Refunds.prototype.retrieve = function (refundId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, variables;
            return __generator(this, function (_a) {
                query = "\n      query GetRefund($id: ID!) {\n        refund: GetRefund(id: $id) {\n          id,\n          amount,\n          status,\n          created_at,\n          description\n        }\n      }\n    ";
                variables = {
                    id: refundId
                };
                // Make the GraphQL request
                return [2 /*return*/, this.zarinpal.graphql(query, variables)];
            });
        });
    };
    /**
     * List refunds with optional pagination.
     * @param {Object} data - The listing parameters.
     * @param {string} data.terminalId - The terminal ID associated with the refunds.
     * @param {number} [data.limit] - The number of records to retrieve (optional).
     * @param {number} [data.offset] - The number of records to skip (optional).
     * @returns {Promise<any>} - The response containing a list of refunds.
     * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
     */
    Refunds.prototype.list = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var query, variables;
            return __generator(this, function (_a) {
                // Validate input data
                Validator_1.Validator.validateTerminalId(data.terminalId);
                if (data.limit) {
                    Validator_1.Validator.validateLimit(data.limit);
                }
                if (data.offset) {
                    Validator_1.Validator.validateOffset(data.offset);
                }
                query = "\n      query GetRefunds($terminal_id: ID!, $limit: Int, $offset: Int) {\n        refunds: GetRefunds(\n          terminal_id: $terminal_id,\n          limit: $limit,\n          offset: $offset\n        ) {\n          id,\n          amount,\n          status,\n          created_at,\n          description\n        }\n      }\n    ";
                variables = {
                    terminal_id: data.terminalId,
                    limit: data.limit,
                    offset: data.offset
                };
                // Make the GraphQL request
                return [2 /*return*/, this.zarinpal.graphql(query, variables)];
            });
        });
    };
    return Refunds;
}());
exports.Refunds = Refunds;
