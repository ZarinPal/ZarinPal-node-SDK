import ZarinPal from 'zarinpal-node-sdk/src';

const zarinpal = new ZarinPal({
  merchantId: 'your-merchant-id',
  sandbox: true,
});

async function getUnverifiedPayments() {
  try {
    const unverifiedPayments = await zarinpal.unverified.list();
    console.log('Unverified Payments:', unverifiedPayments);
  } catch (error) {
    console.error('Error fetching unverified payments:', error);
  }
}

getUnverifiedPayments();
