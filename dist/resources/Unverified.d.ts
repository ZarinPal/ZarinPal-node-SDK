import { ZarinPal } from '../Zarinpal';
/**
 * Class representing the Unverified resource for fetching unverified payments.
 */
export declare class Unverified {
    private zarinpal;
    private endpoint;
    /**
     * Creates an instance of Unverified.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    constructor(zarinpal: ZarinPal);
    /**
     * Retrieve a list of unverified payments.
     * @returns {Promise<any>} - A promise resolving to the list of unverified payments.
     * @throws {Error} - Throws an error if the API call encounters an error.
     */
    list(): Promise<any>;
}
