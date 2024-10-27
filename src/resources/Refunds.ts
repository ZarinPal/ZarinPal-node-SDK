import { ZarinPal } from '../Zarinpal';
import { Validator } from '../utils/Validator';

/**
 * Class representing the Refunds resource for handling refund operations via GraphQL.
 */
export class Refunds {
  private zarinpal: ZarinPal;

  /**
   * Creates an instance of Refunds.
   * @param {ZarinPal} zarinpal - The ZarinPal instance.
   */
  constructor(zarinpal: ZarinPal) {
    this.zarinpal = zarinpal;
  }

  /**
   * Create a refund request via GraphQL.
   * @param {Object} data - The refund request data.
   * @param {string} data.sessionId - The session ID of the transaction to refund.
   * @param {number} data.amount - The amount to refund.
   * @param {string} [data.description] - A description for the refund (optional).
   * @param {string} [data.method] - The refund method, e.g., 'PAYA' or 'CARD' (optional).
   * @param {string} [data.reason] - The reason for the refund, e.g., 'CUSTOMER_REQUEST' (optional).
   * @returns {Promise<any>} - The response from the GraphQL API.
   * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
   */
  public async create(data: {
    sessionId: string;
    amount: number;
    description?: string;
    method?: string;
    reason?: string;
  }): Promise<any> {
    // Validate input data
    Validator.validateSessionId(data.sessionId);
    Validator.validateAmount(data.amount);
    if (data.method) {
      Validator.validateMethod(data.method);
    }
    if (data.reason) {
      Validator.validateReason(data.reason);
    }

    const query = `
      mutation AddRefund(
        $session_id: ID!,
        $amount: BigInteger!,
        $description: String,
        $method: InstantPayoutActionTypeEnum,
        $reason: RefundReasonEnum
      ) {
        resource: AddRefund(
          session_id: $session_id,
          amount: $amount,
          description: $description,
          method: $method,
          reason: $reason
        ) {
          terminal_id,
          id,
          amount,
          timeline {
            refund_amount,
            refund_time,
            refund_status
          }
        }
      }
    `;

    const variables = {
      session_id: data.sessionId,
      amount: data.amount,
      description: data.description,
      method: data.method,
      reason: data.reason,
    };

    // Make the GraphQL request
    return this.zarinpal.graphql(query, variables);
  }

  /**
   * Retrieve details of a specific refund.
   * @param {string} refundId - The ID of the refund to retrieve.
   * @returns {Promise<any>} - The response containing refund details.
   * @throws {Error} - Throws an error if the API call encounters an error.
   */
  public async retrieve(refundId: string): Promise<any> {
    const query = `
      query GetRefund($id: ID!) {
        refund: GetRefund(id: $id) {
          id,
          amount,
          status,
          created_at,
          description
        }
      }
    `;

    const variables = {
      id: refundId,
    };

    // Make the GraphQL request
    return this.zarinpal.graphql(query, variables);
  }

  /**
   * List refunds with optional pagination.
   * @param {Object} data - The listing parameters.
   * @param {string} data.terminalId - The terminal ID associated with the refunds.
   * @param {number} [data.limit] - The number of records to retrieve (optional).
   * @param {number} [data.offset] - The number of records to skip (optional).
   * @returns {Promise<any>} - The response containing a list of refunds.
   * @throws {Error} - Throws an error if validation fails or the API call encounters an error.
   */
  public async list(data: {
    terminalId: string;
    limit?: number;
    offset?: number;
  }): Promise<any> {
    // Validate input data
    Validator.validateTerminalId(data.terminalId);
    if (data.limit) {
      Validator.validateLimit(data.limit);
    }
    if (data.offset) {
      Validator.validateOffset(data.offset);
    }

    const query = `
      query GetRefunds($terminal_id: ID!, $limit: Int, $offset: Int) {
        refunds: GetRefunds(
          terminal_id: $terminal_id,
          limit: $limit,
          offset: $offset
        ) {
          id,
          amount,
          status,
          created_at,
          description
        }
      }
    `;

    const variables = {
      terminal_id: data.terminalId,
      limit: data.limit,
      offset: data.offset,
    };

    // Make the GraphQL request
    return this.zarinpal.graphql(query, variables);
  }
}
