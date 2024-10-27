import { ZarinPal } from '../Zarinpal';
import { Validator } from '../utils/Validator';

/**
 * Class representing the Verifications resource for verifying payments.
 */
export class Verifications {
  private zarinpal: ZarinPal;
  private endpoint: string = '/pg/v4/payment/verify.json';

  /**
   * Creates an instance of Verifications.
   * @param {ZarinPal} zarinpal - The ZarinPal instance.
   */
  constructor(zarinpal: ZarinPal) {
    this.zarinpal = zarinpal;
  }

  /**
   * Verify a payment transaction.
   * @param {Object} data - The verification data.
   * @param {number} data.amount - The amount of the transaction to verify.
   * @param {string} data.authority - The authority code of the transaction.
   * @returns {Promise<any>} - A promise resolving to the verification result.
   * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
   */
  public async verify(data: {
    amount: number;
    authority: string;
  }): Promise<any> {
    // Validate input data
    Validator.validateAmount(data.amount);
    Validator.validateAuthority(data.authority);

    // Make the API request
    return this.zarinpal.request('POST', this.endpoint, data);
  }
}
