// examples/paymentRequest.ts

import { SDKOptions } from '../src/Options';
import { ZarinPal } from '../src/Zarinpal';
import { RequestRequest } from '../src/Endpoint/PaymentGateway/RequestTypes/RequestRequest';
import { ClientBuilder } from '../src/ClientBuilder';
import axios from 'axios';

// ایجاد نمونه clientBuilder و افزودن header پیش‌فرض
const clientBuilder = new ClientBuilder('https://payment.zarinpal.com'); // تنظیم URL مناسب
clientBuilder.addPlugin((config) => {
    config.headers['Accept'] = 'application/json';
    return config;
});

const options = new SDKOptions({
    clientBuilder,
    sandbox: false, // در صورت نیاز، حالت sandbox را فعال کنید
    merchantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // شناسه merchant
});

const zarinpal = new ZarinPal(options);
const paymentGateway = zarinpal.paymentGateway();

const request = new RequestRequest();
request.amount = 10000; // حداقل مبلغ 10000 ریال
request.description = 'Payment for order 12345';
request.callback_url = 'https://your-site/examples/verify'; // URL بازگشت به سایت شما
request.mobile = '09220949640'; // اختیاری
request.email = 'test@example.com'; // اختیاری
request.currency = 'IRR'; // واحد پول اختیاری، IRR یا IRT (پیش‌فرض IRR)
request.cardPan = '5894631122689482'; // اختیاری


(async () => {
    try {
        const response = await paymentGateway.request(request);
        const url = paymentGateway.getRedirectUrl(response.authority);

        console.log('Redirecting to payment URL:', url);
        // برای هدایت به URL پرداخت:
        // window.location.href = url; // برای مرورگر
    } catch (error: any) {
        console.error('Payment request failed:', error.message);
    }
})();
