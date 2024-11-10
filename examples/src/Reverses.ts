import ZarinPal from 'zarinpal-node-sdk/src';

const zarinpal = new ZarinPal({
  merchantId: 'your-merchant-id',
  sandbox: true,
});

async function reverseTransaction() {
  try {
    const response = await zarinpal.reversals.reverse({
      authority: 'A000000000000000000000000000000000',
    });
    console.log('Transaction Reversed:', response);
  } catch (error) {
    console.error('Error reversing transaction:', error);
  }
}

reverseTransaction();
