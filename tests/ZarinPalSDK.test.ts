// tests/ZarinPalSDK.test.ts

import { ZarinPal } from "../src/Zarinpal";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Begin of test class
describe("ZarinPal SDK Tests", () => {
  let zarinpal: ZarinPal;
  let mockHttpClient: MockAdapter;
  let mockGraphqlClient: MockAdapter;

  beforeEach(() => {
    zarinpal = new ZarinPal({
      merchantId: "test-merchant-id",
      accessToken: "test-access-token",
      sandbox: true,
    });

    // Mock the HTTP and GraphQL clients
    mockHttpClient = new MockAdapter(zarinpal["httpClient"]);
    mockGraphqlClient = new MockAdapter(zarinpal["graphqlClient"]);
  });

  afterEach(() => {
    mockHttpClient.restore();
    mockGraphqlClient.restore();
  });

  // Inquiries Tests
  describe("Inquiries - inquire method", () => {
    it("should successfully inquire about a transaction", async () => {
      const authority = "A0000000000000000000000000006qpmlj9d";

      // Mock the API response
      mockHttpClient.onPost("/pg/v4/payment/inquiry.json").reply(200, {
        data: {
          code: 100,
          message: "Operation was successful",
          authority: authority,
          amount: 10000,
          ref_id: 123456789,
        },
      });

      const response = await zarinpal.inquiries.inquire({ authority });

      expect(response).toEqual({
        data: {
          code: 100,
          message: "Operation was successful",
          authority: authority,
          amount: 10000,
          ref_id: 123456789,
        },
      });
    });

    it("should throw an error if authority code is invalid", async () => {
      const invalidAuthority = "invalid_authority";

      await expect(
        zarinpal.inquiries.inquire({ authority: invalidAuthority })
      ).rejects.toThrow(
        'Invalid authority format. It should be a string starting with "A" or "S" followed by 35 alphanumeric characters.'
      );
    });
  });

  // Payments Tests
  describe("Payments - create method", () => {
    it("should successfully create a payment request", async () => {
      const paymentData = {
        amount: 10000,
        callback_url: "https://yourwebsite.com/callback",
        description: "Test Payment",
        mobile: "09123456789",
        email: "customer@example.com",
      };

      // Mock the API response
      mockHttpClient.onPost("/pg/v4/payment/request.json").reply(200, {
        data: {
          code: 100,
          message: "Operation was successful",
          authority: "A0000000000000000000000000006qpmlj8d",
          fee_type: "Merchant",
          fee: 0,
        },
      });

      const response = await zarinpal.payments.create(paymentData);

      expect(response).toEqual({
        data: {
          code: 100,
          message: "Operation was successful",
          authority: "A0000000000000000000000000006qpmlj8d",
          fee_type: "Merchant",
          fee: 0,
        },
      });
    });

    it("should throw an error if amount is less than minimum", async () => {
      const paymentData = {
        amount: 500, // Less than the minimum amount
        callback_url: "https://yourwebsite.com/callback",
        description: "Test Payment",
      };

      await expect(zarinpal.payments.create(paymentData)).rejects.toThrow(
        "Amount must be at least 1000."
      );
    });

    it("should throw an error if callback URL is invalid", async () => {
      const paymentData = {
        amount: 10000,
        callback_url: "invalid_url",
        description: "Test Payment",
      };

      await expect(zarinpal.payments.create(paymentData)).rejects.toThrow(
        "Invalid callback URL format. It should start with http:// or https://."
      );
    });
  });

  // Payments - feeCalculation Tests
  describe("Payments - feeCalculation method", () => {
    it("should successfully calculate the transaction fee", async () => {
      const feeData = {
        merchant_id: "67887a6d-e2f8-4de2-86b1-8db27bc171b5",
        amount: 100000,
        currency: "IRR",
      };

      mockHttpClient.onPost("/pg/v4/payment/feeCalculation.json").reply(200, {
        data: {
          code: 100,
          message: "Fee calculation successful",
          amount: 100000,
          fee: 500,
          fee_type: "Merchant",
        },
      });

      const response = await zarinpal.payments.feeCalculation(feeData);

      expect(response).toEqual({
        data: {
          code: 100,
          message: "Fee calculation successful",
          amount: 100000,
          fee: 500,
          fee_type: "Merchant",
        },
      });
    });

    it("should throw an error if amount is less than minimum", async () => {
      const feeData = {
        merchant_id: "67887a6d-e2f8-4de2-86b1-8db27bc171b5",
        amount: 500,
      };
      await expect(zarinpal.payments.feeCalculation(feeData)).rejects.toThrow(
        "Amount must be at least 1000."
      );
    });

    it("should throw an error if merchant_id is invalid", async () => {
      const feeData = {
        merchant_id: "invalid-merchant-id",
        amount: 100000,
      };
      await expect(zarinpal.payments.feeCalculation(feeData)).rejects.toThrow(
        "Invalid merchant_id format. It should be a valid UUID."
      );
    });

    it("should throw an error if currency is invalid", async () => {
      const feeData = {
        merchant_id: "67887a6d-e2f8-4de2-86b1-8db27bc171b5",
        amount: 100000,
        currency: "USD",
      };
      await expect(zarinpal.payments.feeCalculation(feeData)).rejects.toThrow(
        'Invalid currency format. Allowed values are "IRR" or "IRT".'
      );
    });
  });

  // Refunds Tests
  describe("Refunds - create method", () => {
    it("should successfully create a refund", async () => {
      const refundData = {
        sessionId: "session-id",
        amount: 5000,
        description: "Refund for order #1234",
        method: "CARD",
        reason: "CUSTOMER_REQUEST",
      };

      // Mock the GraphQL response
      mockGraphqlClient.onPost("").reply(200, {
        data: {
          resource: {
            terminal_id: "terminal-id",
            id: "refund-id",
            amount: 5000,
            timeline: {
              refund_amount: 5000,
              refund_time: "2023-01-01T00:00:00Z",
              refund_status: "COMPLETED",
            },
          },
        },
      });

      const response = await zarinpal.refunds.create(refundData);

      expect(response).toEqual({
        data: {
          resource: {
            terminal_id: "terminal-id",
            id: "refund-id",
            amount: 5000,
            timeline: {
              refund_amount: 5000,
              refund_time: "2023-01-01T00:00:00Z",
              refund_status: "COMPLETED",
            },
          },
        },
      });
    });

    it("should throw an error if method is invalid", async () => {
      const refundData = {
        sessionId: "session-id",
        amount: 5000,
        method: "INVALID_METHOD",
      };

      await expect(zarinpal.refunds.create(refundData)).rejects.toThrow(
        'Invalid method. Allowed values are "PAYA" or "CARD".'
      );
    });
  });

  // Verifications Tests
  describe("Verifications - verify method", () => {
    it("should successfully verify a payment", async () => {
      const verificationData = {
        amount: 10000,
        authority: "A0000000000000000000000000006qpmlj8d",
      };

      mockHttpClient.onPost("/pg/v4/payment/verify.json").reply(200, {
        data: {
          code: 100,
          message: "Verification successful",
          card_hash: "card-hash",
          card_pan: "123456******1234",
          ref_id: 987654321,
          fee_type: "Merchant",
          fee: 0,
        },
      });

      const response = await zarinpal.verifications.verify(verificationData);

      expect(response).toEqual({
        data: {
          code: 100,
          message: "Verification successful",
          card_hash: "card-hash",
          card_pan: "123456******1234",
          ref_id: 987654321,
          fee_type: "Merchant",
          fee: 0,
        },
      });
    });

    it("should throw an error if amount is invalid", async () => {
      const verificationData = {
        amount: 500, // Less than minimum
        authority: "A0000000000000000000000000006qpmlj8d",
      };

      await expect(
        zarinpal.verifications.verify(verificationData)
      ).rejects.toThrow("Amount must be at least 1000.");
    });
  });

  // Reversals Tests
  describe("Reversals - reverse method", () => {
    it("should successfully reverse a transaction", async () => {
      const authority = "A0000000000000000000000000006qpmlj8d";

      mockHttpClient.onPost("/pg/v4/payment/reverse.json").reply(200, {
        data: {
          code: 100,
          message: "Reversal successful",
          authority: authority,
        },
      });

      const response = await zarinpal.reversals.reverse({ authority });

      expect(response).toEqual({
        data: {
          code: 100,
          message: "Reversal successful",
          authority: authority,
        },
      });
    });

    it("should throw an error if authority code is invalid", async () => {
      const invalidAuthority = "invalid_authority";

      await expect(
        zarinpal.reversals.reverse({ authority: invalidAuthority })
      ).rejects.toThrow(
        'Invalid authority format. It should be a string starting with "A" or "S" followed by 35 alphanumeric characters.'
      );
    });
  });

  // Unverified Tests
  describe("Unverified - list method", () => {
    it("should successfully retrieve unverified payments", async () => {
      mockHttpClient.onPost("/pg/v4/payment/unVerified.json").reply(200, {
        data: {
          code: 100,
          message: "Operation was successful",
          authorities: [
            {
              authority: "A0000000000000000000000000006qpmljax",
              amount: 10000,
              channel: "Web",
            },
            {
              authority: "A0000000000000000000000000006qpmlj8d",
              amount: 20000,
              channel: "Web",
            },
          ],
        },
      });

      const response = await zarinpal.unverified.list();

      expect(response).toEqual({
        data: {
          code: 100,
          message: "Operation was successful",
          authorities: [
            {
              authority: "A0000000000000000000000000006qpmljax",
              amount: 10000,
              channel: "Web",
            },
            {
              authority: "A0000000000000000000000000006qpmlj8d",
              amount: 20000,
              channel: "Web",
            },
          ],
        },
      });
    });
  });

  // Transactions Tests
  describe("Transactions - list method", () => {
    it("should successfully retrieve a list of transactions", async () => {
      const transactionData = {
        terminalId: "terminal-id",
        filter: "PAID",
        limit: 10,
        offset: 0,
      };

      // Mock the GraphQL response
      mockGraphqlClient.onPost("").reply(200, {
        data: {
          transactions: [
            {
              id: "transaction-id-1",
              status: "PAID",
              amount: 10000,
              description: "Payment 1",
              created_at: "2023-01-01T00:00:00Z",
            },
            {
              id: "transaction-id-2",
              status: "PAID",
              amount: 20000,
              description: "Payment 2",
              created_at: "2023-01-02T00:00:00Z",
            },
          ],
        },
      });

      const response = await zarinpal.transactions.list(transactionData);

      expect(response).toEqual({
        data: {
          transactions: [
            {
              id: "transaction-id-1",
              status: "PAID",
              amount: 10000,
              description: "Payment 1",
              created_at: "2023-01-01T00:00:00Z",
            },
            {
              id: "transaction-id-2",
              status: "PAID",
              amount: 20000,
              description: "Payment 2",
              created_at: "2023-01-02T00:00:00Z",
            },
          ],
        },
      });
    });

    it("should throw an error if filter is invalid", async () => {
      const transactionData = {
        terminalId: "terminal-id",
        filter: "INVALID_FILTER",
      };

      await expect(zarinpal.transactions.list(transactionData)).rejects.toThrow(
        "Invalid filter value."
      );
    });
  });

  // Validator Tests
  describe("Validator", () => {
    const { Validator } = require("../src/utils/Validator");

    it("should validate a correct merchant ID", () => {
      expect(() =>
        Validator.validateMerchantId("123e4567-e89b-12d3-a456-426614174000")
      ).not.toThrow();
    });

    it("should throw an error for invalid merchant ID", () => {
      expect(() => Validator.validateMerchantId("invalid-uuid")).toThrow(
        "Invalid merchant_id format. It should be a valid UUID."
      );
    });

    it("should validate a correct authority code", () => {
      expect(() =>
        Validator.validateAuthority("A12345678901234567890123456789012345")
      ).not.toThrow();
    });

    it("should throw an error for invalid authority code", () => {
      expect(() => Validator.validateAuthority("invalid_authority")).toThrow(
        'Invalid authority format. It should be a string starting with "A" or "S" followed by 35 alphanumeric characters.'
      );
    });

    // Add more tests for other validation methods as needed
  });
});
// End of test class
