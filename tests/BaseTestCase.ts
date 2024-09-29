
import { SDKOptions } from '../src/Options';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export class BaseTestCase {
    protected mockClient: MockAdapter;
    protected options: SDKOptions;

    constructor() {
        this.mockClient = new MockAdapter(axios);
        this.options = new SDKOptions({
            accessToken: 'mock-access-token',
            merchantId: '25fe4c36-66e4-11e9-a9e4-000c29344814',
        });
    }

    getMockClient(): MockAdapter {
        return this.mockClient;
    }

    getOptions(): SDKOptions {
        return this.options;
    }

    tearDown() {
        this.mockClient.reset();
    }
}
