// examples/reverseRequest.ts

import { SDKOptions } from '../src/Options';
import { ZarinPal } from '../src/Zarinpal';
import { ReverseRequest } from '../src/Endpoint/PaymentGateway/RequestTypes/ReverseRequest';

const options = new SDKOptions({
    merchantId: '1379bc04-196d-47bb-a8f0-0e969ec96179', // جایگزین با شناسه merchant واقعی
});

const zarinpal = new ZarinPal(options);
const paymentGateway = zarinpal.paymentGateway();

const reverseRequest = new ReverseRequest();
reverseRequest.authority = 'A000000000000000000000000000ydq5y838'; // Authority از تراکنش اصلی

(async () => {
    try {
        const response = await paymentGateway.reverse(reverseRequest);
        console.log('Transaction Reversed:');
        console.log(`Code: ${response.code}`);
        console.log(`Message: ${response.message}`);
    } catch (error: any) {
        console.error('Transaction reversal failed:', error.message);
    }
})();
