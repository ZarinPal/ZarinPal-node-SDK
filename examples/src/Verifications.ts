import  ZarinPal from 'zarinpal-node-sdk/src';

const zarinpal = new ZarinPal({
  merchantId: 'your-merchant-id',
  sandbox: true,
});

async function verifyPayment() {
  if (status === 'OK') {
    const amount = await getAmountFromDatabase(authority); // Implement this function

    if (amount) {
      try {
        const response = await zarinpal.verifications.verify({
          amount: amount,
          authority: authority,
        });

        if (response.data.code === 100) {
          console.log('Payment Verified:');
          console.log('Reference ID:', response.data.ref_id);
          console.log('Card PAN:', response.data.card_pan);
          console.log('Fee:', response.data.fee);
        } else if (response.data.code === 101) {
          console.log('Payment already verified.');
        } else {
          console.log('Transaction failed with code:', response.data.code);
        }
      } catch (error) {
        console.error('Payment Verification Failed:', error);
      }
    } else {
      console.log('No Matching Transaction Found For This Authority Code.');
    }
  } else {
    console.log('Transaction was cancelled or failed.');
  }
}

// Example usage:
// Replace these with the actual values from your request parameters
const authority = 'A000000000000000000000000000000000';
const status = 'OK';

verifyPayment();

