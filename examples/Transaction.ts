// examples/transactionList.ts

import { SDKOptions } from '../src/Options';
import { TransactionService } from '../src/Endpoint/GraphQl/TransactionService';
import { TransactionListRequest } from '../src/Endpoint/GraphQl/RequestTypes/TransactionListRequest';
import { ResponseException } from '../src/httpClient/Exception/ResponseException';

const options = new SDKOptions({
    accessToken: 'your access token', // جایگزین با access token معتبر
});

const transactionService = new TransactionService(options);

const transactionRequest = new TransactionListRequest();
transactionRequest.terminalId = '3364';
transactionRequest.filter = 'PAID'; // فیلتر اختیاری: PAID, VERIFIED, TRASH, ACTIVE, REFUNDED

(async () => {
    try {
        const transactions = await transactionService.getTransactions(transactionRequest);

        const transactionArray = transactions.map(transaction => ({
            'Transaction ID': transaction.id,
            'Status': transaction.status,
            'Amount': transaction.amount,
            'Description': transaction.description,
            'Created At': transaction.created_at,
        }));

        console.log(JSON.stringify(transactionArray, null, 2));
    } catch (error: any) {
        console.error('Full Error:', error);

        if (error instanceof ResponseException) {
            console.error('GraphQL Error:', error.message);
        } else {
            console.error('General Error:', error.message);
        }
    }
})();