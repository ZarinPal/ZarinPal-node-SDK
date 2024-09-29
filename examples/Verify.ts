import { SDKOptions } from '../src/Options';
import { ZarinPal } from '../src/Zarinpal';
import { VerifyRequest } from '../src/Endpoint/PaymentGateway/RequestTypes/VerifyRequest';
import { ClientBuilder } from '../src/ClientBuilder';

// تابع فرضی برای دریافت مبلغ از دیتابیس
const getAmountFromDatabase = async (authority: string): Promise<number | null> => {
    // اینجا باید به دیتابیس خودتان دسترسی پیدا کنید و مبلغ مربوط به authority را دریافت کنید.
    // برای این مثال، یک مقدار ثابت بازگردانده شده است.
    return 10000; // مقدار فرضی برای تست
};

// ساخت یک ClientBuilder و اضافه کردن پلاگین‌ها
const clientBuilder = new ClientBuilder('https://payment.zarinpal.com');
clientBuilder.addPlugin(async (config) => {
    config.headers['Accept'] = 'application/json';
    return config;
});

const options = new SDKOptions({
    clientBuilder,
    sandbox: false,
    merchantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // شناسه merchant واقعی خود را جایگزین کنید
});

const zarinpal = new ZarinPal(options);
const paymentGateway = zarinpal.paymentGateway();

const urlParams = new URLSearchParams(window.location.search);
const authority = urlParams.get('Authority');
const status = urlParams.get('Status');

(async () => {
    if (status === 'OK' && authority) {
        const amount = await getAmountFromDatabase(authority);

        if (amount) {
            const verifyRequest = new VerifyRequest();
            verifyRequest.authority = authority;
            verifyRequest.amount = amount;

            try {
                const response = await paymentGateway.verify(verifyRequest);

                if (response.code === 100 || response.code === 101) {
                    console.log('Payment Verified:');
                    console.log(`Reference ID: ${response.ref_id}`);
                    console.log(`Card PAN: ${response.card_pan}`);
                    console.log(`Fee: ${response.fee}`);
                } else {
                    console.log(`Transaction failed with code: ${response.code}`);
                }
            } catch (error: any) {
                console.error('Payment verification failed:', error.message);
            }
        } else {
            console.log('No matching transaction found for this authority code.');
        }
    } else {
        console.log('Transaction was cancelled or failed.');
    }
})();
