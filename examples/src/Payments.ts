import ZarinPal  from 'zarinpal-node-sdk';
 //var ZarinPal = require('zarinpal-node-sdk')

const zarinpal = new ZarinPal({
  merchantId: 'your-merchant-id',
  sandbox: true,
});

async function initiatePayment() {
  try {
    const response = await zarinpal.payments.create({
      amount: 10000,
      callback_url: 'https://yourwebsite.com/callback',
      description: 'Payment for order #1234',
      mobile: '09123456789',
      email: 'customer@example.com',
      cardPan: ['6219861034529007', '5022291073776543'],
      referrer_id: 'affiliate123',
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

initiatePayment();
