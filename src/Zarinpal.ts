// src/ZarinPal.ts

import axios, { AxiosInstance } from 'axios';
import { SDKOptions  } from './Options';
import {PaymentGateway} from "./Endpoint/PaymentGateway/PaymentGateway";

export class ZarinPal {
    private clientBuilder: SDKOptions;
    private options: SDKOptions;
    private httpClient: AxiosInstance;

    constructor(options?: SDKOptions) {
        this.options = options ?? new SDKOptions();
        this.clientBuilder = this.options.getClientBuilder();

        // Create axios instance with base URL and headers
        this.httpClient = axios.create({
            baseURL: this.options.getBaseUrl(),
            headers: {
                'User-Agent': `${this.getClassName()}Sdk/v.0.1 (Node.js)`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    }

    // Helper method to get class name
    private getClassName(): string {
        return this.constructor.name;
    }

    // Get options
    public getOptions(): SDKOptions {
        return this.options;
    }

    // Get payment gateway instance
    public paymentGateway(): PaymentGateway {
        return new PaymentGateway(this);
    }

    // Get merchant ID
    public getMerchantId(): string {
        return this.options.getMerchantId();
    }

    // Get HTTP client (axios instance)
    public getHttpClient(): AxiosInstance {
        return this.httpClient;
    }

    // Set a new HTTP client (axios instance)
    public setHttpClient(client: AxiosInstance): void {
        this.httpClient = client;
    }
}
