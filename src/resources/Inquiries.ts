import { ZarinPal } from '../Zarinpal';
import { Validator } from '../utils/Validator';

/**
 * Class representing the Inquiries resource for checking transaction status.
 */
export class Inquiries {
  private zarinpal: ZarinPal;
  private endpoint: string = '/pg/v4/payment/inquiry.json';

  /**
   * Creates an instance of Inquiries.
   * @param {ZarinPal} zarinpal - The ZarinPal instance.
   */
  constructor(zarinpal: ZarinPal) {
    this.zarinpal = zarinpal;
  }

  /**
   * Inquire about the status of a transaction.
   * @param {Object} data - The inquiry data.
   * @param {string} data.authority - The authority code of the transaction.
   * @returns {Promise<any>} - The response from the API.
   * @throws {Error} - Throws an error if validation fails or the API call fails.
   */
  public async inquire(data: {
    authority: string;
  }): Promise<any> {
    // Validate input data
    Validator.validateAuthority(data.authority);

    // Make the API request
    return this.zarinpal.request('POST', this.endpoint, data);
  }
}
