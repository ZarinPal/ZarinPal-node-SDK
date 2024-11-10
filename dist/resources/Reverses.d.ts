import { ZarinPal } from '../Zarinpal';
/**
 * Class representing the Reversals resource for reversing transactions.
 */
export declare class Reversals {
    private zarinpal;
    private endpoint;
    /**
     * Creates an instance of Reversals.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    constructor(zarinpal: ZarinPal);
    /**
     * Reverse a transaction.
     * @param {Object} data - The reversal request data.
     * @param {string} data.authority - The authority code of the transaction to reverse.
     * @returns {Promise<any>} - The response from the API.
     * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
     */
    reverse(data: {
        authority: string;
    }): Promise<any>;
}
