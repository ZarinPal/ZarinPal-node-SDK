import { ZarinPal } from '../Zarinpal';
/**
 * Class representing the Inquiries resource for checking transaction status.
 */
export declare class Inquiries {
    private zarinpal;
    private endpoint;
    /**
     * Creates an instance of Inquiries.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    constructor(zarinpal: ZarinPal);
    /**
     * Inquire about the status of a transaction.
     * @param {Object} data - The inquiry data.
     * @param {string} data.authority - The authority code of the transaction.
     * @returns {Promise<any>} - The response from the API.
     * @throws {Error} - Throws an error if validation fails or the API call fails.
     */
    inquire(data: {
        authority: string;
    }): Promise<any>;
}
