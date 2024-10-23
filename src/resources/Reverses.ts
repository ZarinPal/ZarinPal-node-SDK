import { ZarinPal } from '../Zarinpal';
import { Validator } from '../utils/Validator';

/**
 * Class representing the Reversals resource for reversing transactions.
 */
export class Reversals {
  private zarinpal: ZarinPal;
  private endpoint: string = '/pg/v4/payment/reverse.json';

  /**
   * Creates an instance of Reversals.
   * @param {ZarinPal} zarinpal - The ZarinPal instance.
   */
  constructor(zarinpal: ZarinPal) {
    this.zarinpal = zarinpal;
  }

  /**
   * Reverse a transaction.
   * @param {Object} data - The reversal request data.
   * @param {string} data.authority - The authority code of the transaction to reverse.
   * @returns {Promise<any>} - The response from the API.
   * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
   */
  public async reverse(data: {
    authority: string;
  }): Promise<any> {
    // Validate input data
    Validator.validateAuthority(data.authority);

    // Make the API request
    return this.zarinpal.request('POST', this.endpoint, data);
  }
}
