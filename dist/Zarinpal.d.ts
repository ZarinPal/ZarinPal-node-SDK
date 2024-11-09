import { Config } from './utils/Config';
import { Payments } from './resources/Payments';
import { Refunds } from './resources/Refunds';
import { Transactions } from './resources/Transactions';
import { Verifications } from './resources/Verifications';
import { Reversals } from './resources/Reverses';
import { Unverified } from './resources/Unverified';
import { Inquiries } from './resources/Inquiries';
/**
 * Main class for interacting with ZarinPal APIs.
 * Provides access to various resources such as payments, refunds, transactions, etc.
 */
export declare class ZarinPal {
    /**
     * The Payments resource for creating and managing payments.
     * @type {Payments}
     */
    payments: Payments;
    /**
     * The Refunds resource for creating and managing refunds.
     * @type {Refunds}
     */
    refunds: Refunds;
    /**
     * The Transactions resource for querying transactions.
     * @type {Transactions}
     */
    transactions: Transactions;
    /**
     * The Verifications resource for verifying payments.
     * @type {Verifications}
     */
    verifications: Verifications;
    /**
     * The Reversals resource for reversing payments.
     * @type {Reversals}
     */
    reversals: Reversals;
    /**
     * The Unverified resource for retrieving unverified payments.
     * @type {Unverified}
     */
    unverified: Unverified;
    /**
     * The Inquiries resource for inquiring about payment statuses.
     * @type {Inquiries}
     */
    inquiries: Inquiries;
    /**
     * The configuration object.
     * @type {Config}
     * @private
     */
    private config;
    /**
     * Axios instance for making HTTP requests to the REST API.
     * @type {AxiosInstance}
     * @private
     */
    private httpClient;
    /**
     * Axios instance for making GraphQL requests.
     * @type {AxiosInstance}
     * @private
     */
    private graphqlClient;
    /**
   * The base URL used for API requests.
   * @type {string}
   * @private
   */
    private baseURL;
    /**
     * Creates an instance of ZarinPal.
     * @param {Config} config - The configuration object containing:
     *   - `merchantId` (string): Your merchant ID provided by ZarinPal.
     *   - `accessToken` (string): Access token for authentication (used for GraphQL requests).
     *   - `sandbox` (boolean): Whether to use the sandbox environment.
     */
    constructor(config: Config);
    /**
     * General method for making HTTP requests to ZarinPal's REST API.
     * Automatically includes the merchant ID in the request data.
     * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
     * @param {string} url - The endpoint URL relative to the base URL.
     * @param {any} [data] - The request payload.
     * @returns {Promise<any>} - The response data from the API.
     * @throws {Error} - Throws an error if the request fails.
     */
    request(method: string, url: string, data?: any): Promise<any>;
    /**
     * General method for making GraphQL requests to ZarinPal's API.
     * @param {string} query - The GraphQL query string.
     * @param {any} [variables] - An object containing the variables for the GraphQL query.
     * @returns {Promise<any>} - The response data from the API.
     * @throws {Error} - Throws an error if the request fails.
     */
    graphql(query: string, variables?: any): Promise<any>;
    /**
     * Getter for baseURL.
     * @returns {string} - The base URL used for API requests.
     */
    getBaseUrl(): string;
}
