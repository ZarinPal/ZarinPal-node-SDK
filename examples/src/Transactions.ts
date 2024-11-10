import ZarinPal from 'zarinpal-node-sdk/dist/index';

const zarinpal = new ZarinPal({
  accessToken: 'your-access-token',
  sandbox: true,
});

async function getTransactions() {
  try {
    const transactions = await zarinpal.transactions.list({
      terminalId: 'your-terminal-id',
      filter: 'PAID',
      limit: 10,
      offset: 0,
    });
    console.log('Transactions List:', transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

getTransactions();
