import { ZarinPal } from 'zarinpal-node-sdk/src';

const zarinpal = new ZarinPal({
    merchantId: 'your-merchant-id',
    sandbox: true,
  });

async function inquireTransaction() {
  try {
    const inquiryResult = await zarinpal.inquiries.inquire({
      authority: 'A000000000000000000000000000000000',
    });

    console.log('Inquiry Result:', inquiryResult);
  } catch (error) {
    console.error('Error during inquiry:', error);
  }
}

inquireTransaction();
