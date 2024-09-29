// examples/Inquiry.ts

import { SDKOptions } from '../src/Options';
import { ZarinPal } from '../src/Zarinpal';
import { InquiryRequest } from '../src/Endpoint/PaymentGateway/RequestTypes/InquiryRequest';

const options = new SDKOptions({
    merchantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});

const zarinpal = new ZarinPal(options);
const paymentGateway = zarinpal.paymentGateway();

const inquiryRequest = new InquiryRequest();
inquiryRequest.authority = 'A000000000000000000000000000ydq5y838';

(async () => {
    try {
        const response = await paymentGateway.inquiry(inquiryRequest);
        console.log('Transaction Inquiry:');
        console.log(`Amount: ${response.amount}`);
        console.log(`Status: ${response.message}`);
        console.log(`Code: ${response.code}`);
    } catch (error: any) {
        console.error('Transaction inquiry failed:', error.message);
    }
})();
