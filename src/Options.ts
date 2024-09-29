// src/options/Options.ts

import {ClientBuilder} from "./ClientBuilder";

interface SDKOptionsConfig {
    clientBuilder?: any; // You should replace this with the actual ClientBuilder type
    baseUrl?: string;
    sandboxBaseUrl?: string;
    merchantId?: string;
    graphqlUrl?: string;
    accessToken?: string;
    sandbox?: boolean;
}

export class SDKOptions {
    private options: SDKOptionsConfig;

    constructor(options: SDKOptionsConfig = {}) {
        this.options = {
            clientBuilder: new ClientBuilder(options.baseUrl || 'https://payment.zarinpal.com'),
            baseUrl: 'https://payment.zarinpal.com',
            sandboxBaseUrl: 'https://sandbox.zarinpal.com',
            merchantId: process.env.ZARINPAL_MERCHANT_KEY || 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            graphqlUrl: 'https://next.zarinpal.com/api/v4/graphql',
            accessToken: process.env.ZARINPAL_ACCESS_TOKEN || '',
            sandbox: false,
            ...options,
        };
    }

    private arrayGet(array: { [key: string]: any }, key: string, defaultValue: string | null = null): string | null {
        if (key in array && array[key] !== '') {
            return array[key];
        }
        return defaultValue;
    }

    public getClientBuilder(): any {
        return this.options.clientBuilder;
    }

    public getBaseUrl(): string {
        return this.options.sandbox
            ? this.options.sandboxBaseUrl || 'https://sandbox.zarinpal.com'
            : this.options.baseUrl || 'https://payment.zarinpal.com';
    }

    public getMerchantId(): string {
        return this.options.merchantId!;
    }

    public getGraphqlUrl(): string {
        return this.options.graphqlUrl!;
    }

    public getAccessToken(): string {
        return this.options.accessToken!;
    }

    public isSandbox(): boolean {
        return this.options.sandbox!;
    }
}
