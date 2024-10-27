import { ZarinPal } from '../Zarinpal';
import { Validator } from '../utils/Validator';

/**
 * Class representing the Transactions resource for fetching transaction information via GraphQL.
 */
export class Transactions {
  private zarinpal: ZarinPal;

  /**
   * Creates an instance of Transactions.
   * @param {ZarinPal} zarinpal - The ZarinPal instance.
   */
  constructor(zarinpal: ZarinPal) {
    this.zarinpal = zarinpal;
  }

  /**
   * Retrieve a list of transactions via GraphQL.
   * @param {Object} data - The transaction query parameters.
   * @param {string} data.terminalId - The terminal ID associated with the transactions.
   * @param {string} [data.filter] - A filter for the transactions (optional).
   * @param {number} [data.limit] - The number of records to retrieve (optional).
   * @param {number} [data.offset] - The number of records to skip (optional).
   * @returns {Promise<any>} - A promise resolving to the list of transactions.
   * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
   */
  public async list(data: {
    terminalId: string;
    filter?: string;
    limit?: number;
    offset?: number;
  }): Promise<any> {
    // Validate input data
    Validator.validateTerminalId(data.terminalId);
    if (data.filter) {
      Validator.validateFilter(data.filter);
    }
    if (data.limit) {
      Validator.validateLimit(data.limit);
    }
    if (data.offset) {
      Validator.validateOffset(data.offset);
    }

    const query = `
      query GetTransactions($terminal_id: ID!, $filter: String, $limit: Int, $offset: Int) {
        transactions: GetTransactions(
          terminal_id: $terminal_id,
          filter: $filter,
          limit: $limit,
          offset: $offset
        ) {
          id,
          status,
          amount,
          description,
          created_at
        }
      }
    `;

    const variables = {
      terminal_id: data.terminalId,
      filter: data.filter,
      limit: data.limit,
      offset: data.offset,
    };

    // Make the GraphQL request
    return this.zarinpal.graphql(query, variables);
  }
}
