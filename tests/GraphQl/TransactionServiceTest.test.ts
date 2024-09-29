// tests/graphql/TransactionServiceTest.test.ts

import MockAdapter from 'axios-mock-adapter';
import { BaseTestCase } from '../BaseTestCase';
import { TransactionService } from '../../src/Endpoint/GraphQl/TransactionService';
import { TransactionListRequest } from '../../src/Endpoint/GraphQl/RequestTypes/TransactionListRequest';

describe('TransactionServiceTest', () => {
    let baseTest: BaseTestCase;
    let mockClient: MockAdapter;
    let transactionService: TransactionService;

    beforeEach(() => {
        baseTest = new BaseTestCase();
        mockClient = baseTest.getMockClient();
        transactionService = new TransactionService(baseTest.getOptions());
    });

    afterEach(() => {
        baseTest.tearDown();
    });

    it('should get transactions successfully', async () => {
        const mockResponse = {
            data: {
                Session: [
                    {
                        id: '1234567890',
                        status: 'PAID',
                        amount: 10000,
                        description: 'Test transaction',
                        created_at: '2024-08-25T15:00:00+03:30',
                    },
                ],
            },
        };

        mockClient.onPost().reply(200, mockResponse);

        const transactionRequest = new TransactionListRequest({ terminalId: '238' });

        const transactions = await transactionService.getTransactions(transactionRequest);

        expect(transactions).toHaveLength(1);
        expect(transactions[0].id).toBe('1234567890');
        expect(transactions[0].status).toBe('PAID');
        expect(transactions[0].amount).toBe(10000);
        expect(transactions[0].description).toBe('Test transaction');
    });
});
