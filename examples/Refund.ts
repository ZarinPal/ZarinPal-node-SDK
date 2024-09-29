// examples/refund.ts

import { SDKOptions } from '../src/Options';
import { RefundService } from '../src/endpoint/graphql/RefundService';
import { RefundRequest } from '../src/endpoint/graphql/requestTypes/RefundRequest';

const options = new SDKOptions({
    accessToken: 'your access token', // جایگزین با access token معتبر
});

const refundService = new RefundService(options);

const refundRequest = new RefundRequest();
refundRequest.sessionId = '580868147';
refundRequest.amount = 20000; // مقدار به ریال (IRR)
refundRequest.description = 'Refund for order 12345';
refundRequest.method = 'CARD'; // روش پرداخت: 'CARD' برای فوری و 'PAYA' برای عادی
refundRequest.reason = 'CUSTOMER_REQUEST'; // دلیل بازپرداخت

(async () => {
    try {
        const response = await refundService.refund(refundRequest);
        console.log('Refund Processed:');
        console.log(`Transaction ID: ${response.id}`);
        console.log(`Terminal ID: ${response.terminalId}`);
        console.log(`Refund Amount: ${response.timeline[0].refund_amount}`);
        console.log(`Refund Time: ${response.timeline[0].refund_time}`);
        console.log(`Refund Status: ${response.timeline[0].refund_status}`);
    } catch (error: any) {
        console.error('Refund failed:', error.message);
    }
})();
