import { ZarinPal } from '../Zarinpal';
/**
 * Class representing the Payments resource for creating payment requests.
 */
export declare class Payments {
    private zarinpal;
    private endpoint;
    private startPayUrl;
    /**
     * Creates an instance of Payments.
     * @param {ZarinPal} zarinpal - The ZarinPal instance.
     */
    constructor(zarinpal: ZarinPal);
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
    create(data: {
        amount: number;
        callback_url: string;
        description: string;
        mobile?: string;
        email?: string;
        cardPan?: string | string[];
        referrer_id?: string;
    }): Promise<any>;
    /**
     * Get the redirect URL for the payment.
     * @param {string} authority - The authority code returned from create request.
     * @returns {string} - The full redirect URL.
     */
    getRedirectUrl(authority: string): string;
}
