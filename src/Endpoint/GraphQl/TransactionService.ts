// src/endpoint/graphql/TransactionService.ts

import axios, { AxiosInstance } from 'axios';
import { TransactionListRequest } from './RequestTypes/TransactionListRequest';
import { TransactionListResponse } from './ResponseTypes/TransactionListResponse';
import { ResponseException } from '../../httpClient/Exception/ResponseException';
import { SDKOptions } from '../../Options';

export class TransactionService {
    private client: AxiosInstance;
    private options: SDKOptions;
    private graphqlUrl: string;

    constructor(options: SDKOptions) {
        this.client = axios.create(); // Instantiate axios client
        this.options = options;
        this.graphqlUrl = options.getGraphqlUrl();
    }

    public async getTransactions(request: TransactionListRequest): Promise<TransactionListResponse[]> {
        const query = request.toGraphQL();

        try {
            const response = await this.client.post(this.graphqlUrl, query, {
                headers: {
                    'Authorization': `Bearer ${this.options.getAccessToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            const responseData = response.data;

            // Check for errors in the response
            if (responseData.errors) {
                throw new ResponseException('GraphQL query error: ' + JSON.stringify(responseData.errors));
            }

            // Map the response data to instances of TransactionListResponse
            const transactions = responseData.data.Session.map((data: any) => new TransactionListResponse(data));

            return transactions;
        } catch (error: any) {
            if (error.response) {
                // Assuming `ResponseException` accepts message and status as two arguments
                throw new ResponseException('Request failed: ' + error.response.data.message, error.response.status);
            } else {
                // Assuming `ResponseException` accepts message only in the case of a general error
                throw new ResponseException('An unexpected error occurred: ' + error.message);
            }
        }
    }
}
