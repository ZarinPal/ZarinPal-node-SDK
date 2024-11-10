import { ZarinPal } from '../Zarinpal';
/**
 * Class representing the Refunds resource for handling refund operations via GraphQL.
 */
export declare class Refunds {
    private zarinpal;
    /**
     * Creates an instance of Refunds.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    constructor(zarinpal: ZarinPal);
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
    create(data: {
        sessionId: string;
        amount: number;
        description?: string;
        method?: string;
        reason?: string;
    }): Promise<any>;
    /**
     * Retrieve details of a specific refund.
     * @param {string} refundId - The ID of the refund to retrieve.
     * @returns {Promise<any>} - The response containing refund details.
     * @throws {Error} - Throws an error if the API call encounters an error.
     */
    retrieve(refundId: string): Promise<any>;
    /**
     * List refunds with optional pagination.
     * @param {Object} data - The listing parameters.
     * @param {string} data.terminalId - The terminal ID associated with the refunds.
     * @param {number} [data.limit] - The number of records to retrieve (optional).
     * @param {number} [data.offset] - The number of records to skip (optional).
     * @returns {Promise<any>} - The response containing a list of refunds.
     * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
     */
    list(data: {
        terminalId: string;
        limit?: number;
        offset?: number;
    }): Promise<any>;
}
