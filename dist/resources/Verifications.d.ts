import { ZarinPal } from '../Zarinpal';
/**
 * Class representing the Verifications resource for verifying payments.
 */
export declare class Verifications {
    private zarinpal;
    private endpoint;
    /**
     * Creates an instance of Verifications.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    constructor(zarinpal: ZarinPal);
    /**
     * Verify a payment transaction.
     * @param {Object} data - The verification data.
     * @param {number} data.amount - The amount of the transaction to verify.
     * @param {string} data.authority - The authority code of the transaction.
     * @returns {Promise<any>} - A promise resolving to the verification result.
     * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
     */
    verify(data: {
        amount: number;
        authority: string;
    }): Promise<any>;
}
