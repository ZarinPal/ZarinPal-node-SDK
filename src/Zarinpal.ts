import axios, { AxiosInstance } from 'axios';
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
export class ZarinPal {
  /**
   * The Payments resource for creating and managing payments.
   * @type {Payments}
   */
  public payments: Payments;

  /**
   * The Refunds resource for creating and managing refunds.
   * @type {Refunds}
   */
  public refunds: Refunds;

  /**
   * The Transactions resource for querying transactions.
   * @type {Transactions}
   */
  public transactions: Transactions;

  /**
   * The Verifications resource for verifying payments.
   * @type {Verifications}
   */
  public verifications: Verifications;

  /**
   * The Reversals resource for reversing payments.
   * @type {Reversals}
   */
  public reversals: Reversals;

  /**
   * The Unverified resource for retrieving unverified payments.
   * @type {Unverified}
   */
  public unverified: Unverified;

  /**
   * The Inquiries resource for inquiring about payment statuses.
   * @type {Inquiries}
   */
  public inquiries: Inquiries;

  /**
   * The configuration object.
   * @type {Config}
   * @private
   */
  private config: Config;

  /**
   * Axios instance for making HTTP requests to the REST API.
   * @type {AxiosInstance}
   * @private
   */
  private httpClient: AxiosInstance;

  /**
   * Axios instance for making GraphQL requests.
   * @type {AxiosInstance}
   * @private
   */
  private graphqlClient: AxiosInstance;

    /**
   * The base URL used for API requests.
   * @type {string}
   * @private
   */
    private baseURL: string;

  /**
   * Creates an instance of ZarinPal.
   * @param {Config} config - The configuration object containing:
   *   - `merchantId` (string): Your merchant ID provided by ZarinPal.
   *   - `accessToken` (string): Access token for authentication (used for GraphQL requests).
   *   - `sandbox` (boolean): Whether to use the sandbox environment.
   */
  constructor(config: Config) {
    this.config = config;

    this.baseURL = this.config.sandbox
      ? 'https://sandbox.zarinpal.com'
      : 'https://payment.zarinpal.com';

    this.httpClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        'User-Agent': 'ZarinPalSdk/v1 (Node.js)',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.graphqlClient = axios.create({
      baseURL: 'https://next.zarinpal.com/api/v4/graphql/',
      headers: {
        'User-Agent': 'ZarinPalSdk/v1 (Node.js)',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.config.accessToken}`,
      },
    });

    this.payments = new Payments(this);
    this.refunds = new Refunds(this);
    this.transactions = new Transactions(this);
    this.verifications = new Verifications(this);
    this.reversals = new Reversals(this);
    this.unverified = new Unverified(this);
    this.inquiries = new Inquiries(this);
  }

  /**
   * General method for making HTTP requests to ZarinPal's REST API.
   * Automatically includes the merchant ID in the request data.
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
   * @param {string} url - The endpoint URL relative to the base URL.
   * @param {any} [data] - The request payload.
   * @returns {Promise<any>} - The response data from the API.
   * @throws {Error} - Throws an error if the request fails.
   */
  public async request(method: string, url: string, data?: any): Promise<any> {
    try {
      const response = await this.httpClient.request({
        method,
        url,
        data: {
          merchant_id: this.config.merchantId,
          ...data,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * General method for making GraphQL requests to ZarinPal's API.
   * @param {string} query - The GraphQL query string.
   * @param {any} [variables] - An object containing the variables for the GraphQL query.
   * @returns {Promise<any>} - The response data from the API.
   * @throws {Error} - Throws an error if the request fails.
   */
  public async graphql(query: string, variables?: any): Promise<any> {
    try {
      const response = await this.graphqlClient.post('', {
        query,
        variables,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Getter for baseURL.
   * @returns {string} - The base URL used for API requests.
   */
  public getBaseUrl(): string {
    return this.baseURL;
  }
}
