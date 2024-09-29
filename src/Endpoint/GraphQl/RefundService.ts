
import axios, { AxiosInstance } from 'axios';
import { RefundRequest } from './RequestTypes/RefundRequest';
import { RefundResponse } from './ResponseTypes/RefundResponse';
import { ResponseException } from '../../httpClient/Exception/ResponseException';
import { SDKOptions  } from '../../Options';

export class RefundService {
    private client: AxiosInstance;
    private options: SDKOptions;
    private graphqlUrl: string;

    constructor(options: SDKOptions) {
        this.client = axios.create(); // Instantiate axios client
        this.options = options;
        this.graphqlUrl = options.getGraphqlUrl();
    }

    public async refund(request: RefundRequest): Promise<RefundResponse> {
        const query = request.toGraphQL();

        try {
            const response = await this.client.post(this.graphqlUrl, query, {
                headers: {
                    'Authorization': `Bearer ${this.options.getAccessToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            // Decode the JSON response
            const responseData = response.data;

            // Check for errors in the response
            if (responseData.errors) {
                throw new ResponseException('GraphQL query error: ' + JSON.stringify(responseData.errors));
            }

            // Return a new RefundResponse with the data from the response
            return new RefundResponse(responseData.data.resource);

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
