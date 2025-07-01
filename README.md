# ZarinPal Node.js SDK

[![npm version](https://img.shields.io/npm/v/zarinpal-node-sdk.svg)](https://www.npmjs.com/package/zarinpal-node-sdk)

Official npm package: [zarinpal-node-sdk on npm](https://www.npmjs.com/package/zarinpal-node-sdk)

A modern Node.js SDK for integrating with the ZarinPal payment gateway. Easily create payment requests, verify transactions, calculate fees, handle refunds, and more with a simple and robust API.

## Features
- Create and manage payment requests
- Calculate transaction fees before payment
- Verify and inquire transactions
- Refund and reverse payments
- TypeScript support
- Easy to use and extend

## Installation

Install via npm:

```bash
npm install zarinpal-node-sdk
```

For more installation options and usage examples, see the official documentation:

[ZarinPal Node.js SDK Documentation](https://www.zarinpal.com/docs/sdk/nodejs/installation.html)

## API Overview

- `zarinpal.payments.create(data)` – Create a new payment request
- `zarinpal.payments.getRedirectUrl(authority)` – Get the payment gateway redirect URL
- `zarinpal.payments.feeCalculation(data)` – Calculate the transaction fee
- `zarinpal.verifications.verify(data)` – Verify a payment
- `zarinpal.inquiries.inquire(data)` – Inquire about a transaction
- `zarinpal.refunds.create(data)` – Request a refund
- `zarinpal.reversals.reverse(data)` – Reverse a transaction
- `zarinpal.unverified.list()` – List unverified payments

## Testing

Run the test suite using:

```bash
npm test
```

## Contributing

Contributions are welcome! Please open issues and submit pull requests for new features, bug fixes, or improvements.

## License

MIT
