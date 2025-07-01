import { ZarinPal } from "../Zarinpal";
import { Validator } from "../utils/Validator";

/**
 * Class representing the Payments resource for creating payment requests.
 */
export class Payments {
  private zarinpal: ZarinPal;
  private endpoint: string = "/pg/v4/payment/request.json";
  private startPayUrl: string = "/pg/StartPay/";

  /**
   * Creates an instance of Payments.
   * @param {ZarinPal} zarinpal - The ZarinPal instance.
   */
  constructor(zarinpal: ZarinPal) {
    this.zarinpal = zarinpal;
  }

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
  public async create(data: {
    amount: number;
    callback_url: string;
    description: string;
    mobile?: string;
    email?: string;
    cardPan?: string | string[];
    referrer_id?: string;
  }): Promise<any> {
    // Validate input data
    Validator.validateAmount(data.amount);
    Validator.validateCallbackUrl(data.callback_url);
    Validator.validateMobile(data.mobile ?? null);
    Validator.validateEmail(data.email ?? null);
    if (Array.isArray(data.cardPan)) {
      for (const card of data.cardPan) {
        Validator.validateCardPan(card);
      }
    } else {
      Validator.validateCardPan(data.cardPan ?? null);
    }

    // Make the API request
    return this.zarinpal.request("POST", this.endpoint, data);
  }

  /**
   * Calculate the transaction fee before creating a payment request.
   * @param {Object} data - The fee calculation request data.
   * @param {string} data.merchant_id - Your merchant ID.
   * @param {number} data.amount - The transaction amount (minimum 1000).
   * @param {string} [data.currency] - The transaction currency (optional, default: IRR).
   * @returns {Promise<any>} - The response from the API.
   * @throws {Error} - Throws an error if validation fails or the API call fails.
   */
  public async feeCalculation(data: {
    merchant_id: string;
    amount: number;
    currency?: string;
  }): Promise<any> {
    Validator.validateMerchantId(data.merchant_id);
    Validator.validateAmount(data.amount);
    Validator.validateCurrency(data.currency ?? null);
    return this.zarinpal.request(
      "POST",
      "/pg/v4/payment/feeCalculation.json",
      data
    );
  }

  /**
   * Get the redirect URL for the payment.
   * @param {string} authority - The authority code returned from create request.
   * @returns {string} - The full redirect URL.
   */
  public getRedirectUrl(authority: string): string {
    const baseUrl = this.zarinpal.getBaseUrl(); // Use getBaseUrl()
    return `${baseUrl}${this.startPayUrl}${authority}`;
  }
}
