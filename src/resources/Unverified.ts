import { ZarinPal } from '../Zarinpal';

/**
 * Class representing the Unverified resource for fetching unverified payments.
 */
export class Unverified {
  private zarinpal: ZarinPal;
  private endpoint: string = '/pg/v4/payment/unVerified.json';

  /**
   * Creates an instance of Unverified.
   * @param {ZarinPal} zarinpal - The ZarinPal instance.
   */
  constructor(zarinpal: ZarinPal) {
    this.zarinpal = zarinpal;
  }

  /**
   * Retrieve a list of unverified payments.
   * @returns {Promise<any>} - A promise resolving to the list of unverified payments.
   * @throws {Error} - Throws an error if the API call encounters an error.
   */
  public async list(): Promise<any> {
    // Make the API request
    return this.zarinpal.request('POST', this.endpoint, {});
  }
}
