// tests/PaymentGateway/PaymentGatewayTest.test.ts

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ZarinPal } from '../../src/Zarinpal';
import { PaymentGateway } from '../../src/Endpoint/PaymentGateway/PaymentGateway';
import { RequestRequest } from '../../src/Endpoint/PaymentGateway/RequestTypes/RequestRequest';
import { VerifyRequest } from '../../src/Endpoint/PaymentGateway/RequestTypes/VerifyRequest';
import { UnverifiedRequest } from '../../src/Endpoint/PaymentGateway/RequestTypes/UnverifiedRequest';
import { ReverseRequest } from '../../src/Endpoint/PaymentGateway/RequestTypes/ReverseRequest';
import { InquiryRequest } from '../../src/Endpoint/PaymentGateway/RequestTypes/InquiryRequest';
import { BaseTestCase } from '../BaseTestCase';

describe('PaymentGateway Test', () => {
    let baseTest: BaseTestCase;
    let mockClient: MockAdapter;
    let gateway: PaymentGateway;

    beforeEach(() => {
        baseTest = new BaseTestCase();
        mockClient = baseTest.getMockClient();

        const zarinpal = new ZarinPal(baseTest.getOptions());
        gateway = new PaymentGateway(zarinpal);
    });

    afterEach(() => {
        baseTest.tearDown();
    });

    it('should successfully request payment', async () => {
        const responseBody = {
            data: {
                authority: 'A00000000000000000000000000123456',
            },
        };

        mockClient.onPost().reply(200, responseBody);

        const request = new RequestRequest();
        request.amount = 10000;
        request.description = 'Test Payment';
        request.callback_url = 'https://callback.url';
        request.mobile = '09370000000';
        request.email = 'test@example.com';

        const response = await gateway.request(request);
        expect(response.authority).toBe('A00000000000000000000000000123456');
    });

    it('should verify payment successfully', async () => {
        const responseBody = {
            data: {
                code: 100,
                ref_id: '1234567890',
            },
        };

        mockClient.onPost().reply(200, responseBody);

        const verify = new VerifyRequest();
        verify.amount = 15000;
        verify.authority = 'A000000000000000000000000000ydq5y838';

        const response = await gateway.verify(verify);
        expect(response.code).toBe(100);
    });

    it('should get unverified transactions successfully', async () => {
        const responseBody = {
            data: {
                code: 100,
                message: 'Success',
                authorities: [
                    {
                        authority: 'A000000000000000000000000000ydq5y838',
                        amount: 50000,
                        callback_url: 'https://example.com/callback',
                        referer: 'https://example.com/referer',
                        date: '2024-09-22 10:00:00',
                    },
                    {
                        authority: 'A000000000000000000000000000ydq5y839',
                        amount: 75000,
                        callback_url: 'https://example.com/callback2',
                        referer: 'https://example.com/referer2',
                        date: '2024-09-22 12:00:00',
                    },
                ],
            },
        };

        mockClient.onPost().reply(200, responseBody);

        const unverified = new UnverifiedRequest();
        const response = await gateway.unverified(unverified);

        expect(response.code).toBe(100);
        expect(response.authorities).toHaveLength(2);
        expect(response.authorities[0].authority).toBe('A000000000000000000000000000ydq5y838');
        expect(response.authorities[0].amount).toBe(50000);
        expect(response.authorities[0].callback_url).toBe('https://example.com/callback');
        expect(response.authorities[0].date).toBe('2024-09-22 10:00:00');
        expect(response.authorities[1].authority).toBe('A000000000000000000000000000ydq5y839');
        expect(response.authorities[1].amount).toBe(75000);
        expect(response.authorities[1].callback_url).toBe('https://example.com/callback2');
        expect(response.authorities[1].date).toBe('2024-09-22 12:00:00');
    });

    it('should reverse payment successfully', async () => {
        const responseBody = {
            data: {
                status: 'Success',
            },
        };

        mockClient.onPost().reply(200, responseBody);

        const reverseRequest = new ReverseRequest();
        reverseRequest.authority = 'A000000000000000000000000000ydq5y838';

        const response = await gateway.reverse(reverseRequest);
        expect(response.status).toBe('Success');
    });

    it('should inquire payment successfully', async () => {
        const responseBody = {
            data: {
                amount: 15000,
            },
        };

        mockClient.onPost().reply(200, responseBody);

        const inquiryRequest = new InquiryRequest();
        inquiryRequest.authority = 'A000000000000000000000000000ydq5y838';

        const response = await gateway.inquiry(inquiryRequest);
        expect(response.amount).toBe(15000);
    });
});
