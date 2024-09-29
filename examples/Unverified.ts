import { SDKOptions } from '../src/Options';
import { ZarinPal } from '../src/Zarinpal';
import { UnverifiedRequest } from '../src/Endpoint/PaymentGateway/RequestTypes/UnverifiedRequest';

const options = new SDKOptions({
    merchantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // شناسه merchant واقعی را جایگزین کنید
});

const zarinpal = new ZarinPal(options);
const paymentGateway = zarinpal.paymentGateway();

const unverifiedRequest = new UnverifiedRequest();

(async () => {
    try {
        const response = await paymentGateway.unverified(unverifiedRequest);

        if (response.code === 100) {
            for (const transaction of response.authorities) {
                console.log(`Transaction Authority: ${transaction.authority}`);
                console.log(`Amount: ${transaction.amount}`);
                console.log(`Callback URL: ${transaction.callback_url}`);
                console.log(`Referer: ${transaction.referer}`);
                console.log(`Date: ${transaction.date}`);
                console.log('--------------------------');
            }
        } else {
            console.log(`Failed to retrieve unverified transactions. Code: ${response.code}`);
            console.log(`Message: ${response.message}`);
        }
    } catch (error: any) {
        console.error('Unverified inquiry failed:', error.message);
    }
})();
