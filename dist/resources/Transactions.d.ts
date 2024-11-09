import { ZarinPal } from '../Zarinpal';
/**
 * Class representing the Transactions resource for fetching transaction information via GraphQL.
 */
export declare class Transactions {
    private zarinpal;
    /**
     * Creates an instance of Transactions.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    constructor(zarinpal: ZarinPal);
    /**
     * Retrieve a list of transactions via GraphQL.
     * @param {Object} data - The transaction query parameters.
     * @param {string} data.terminalId - The terminal ID associated with the transactions.
     * @param {string} [data.filter] - A filter for the transactions (optional).
     * @param {number} [data.limit] - The number of records to retrieve (optional).
     * @param {number} [data.offset] - The number of records to skip (optional).
     * @returns {Promise<any>} - A promise resolving to the list of transactions.
     * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
     */
    list(data: {
        terminalId: string;
        filter?: string;
        limit?: number;
        offset?: number;
    }): Promise<any>;
}
