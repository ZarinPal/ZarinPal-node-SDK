import ZarinPal from 'zarinpal-node-sdk/src';

const zarinpal = new ZarinPal({
  accessToken: 'your-access-token',
  sandbox: true,
});

async function processRefund() {
  try {
    // Create a refund
    const refundResponse = await zarinpal.refunds.create({
      sessionId: 'session-id-to-refund',
      amount: 5000,
      description: 'Refund for order #1234',
      method: 'CARD',
      reason: 'CUSTOMER_REQUEST',
    });
    console.log('Refund Created:', refundResponse);

    // Retrieve refund details
    const refundDetails = await zarinpal.refunds.retrieve(refundResponse.id);
    console.log('Refund Details:', refundDetails);

    // List refunds
    const refundsList = await zarinpal.refunds.list({
      terminalId: 'your-terminal-id',
      limit: 10,
      offset: 0,
    });
    console.log('Refunds List:', refundsList);
  } catch (error) {
    console.error('Error processing refund:', error);
  }
}

processRefund();
