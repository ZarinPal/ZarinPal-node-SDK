// tests/graphql/GraphQLRefundTest.test.ts

import MockAdapter from 'axios-mock-adapter';
import { BaseTestCase } from '../BaseTestCase';
import { RefundService } from '../../src/Endpoint/GraphQl/RefundService';
import { RefundRequest } from '../../src/Endpoint/GraphQl/RequestTypes/RefundRequest';

describe('GraphQLRefundTest', () => {
    let baseTest: BaseTestCase;
    let mockClient: MockAdapter;
    let refundService: RefundService;

    beforeEach(() => {
        baseTest = new BaseTestCase();
        mockClient = baseTest.getMockClient();
        refundService = new RefundService(baseTest.getOptions());
    });

    afterEach(() => {
        baseTest.tearDown();
    });

    it('should successfully refund a transaction', async () => {
        const refundRequest = new RefundRequest({
            sessionId: '385404539',
            amount: 20000,
            description: 'Test Refund',
        });

        const mockResponse = {
            data: {
                resource: {
                    id: '1234567890',
                    terminal_id: '238',
                    amount: 20000,
                    timeline: [
                        {
                            refund_amount: 20000,
                            refund_time: '2024-08-25T15:00:00+03:30',
                            refund_status: 'PENDING',
                        },
                    ],
                },
            },
        };

        mockClient.onPost().reply(200, mockResponse);

        const response = await refundService.refund(refundRequest);

        expect(response.id).toBe('1234567890');
        expect(response.amount).toBe(20000);
        expect(response.timeline[0].refund_status).toBe('PENDING');
    });
});
