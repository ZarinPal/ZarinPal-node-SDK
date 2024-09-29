

import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

interface Plugin {
    (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> | InternalAxiosRequestConfig;
}

export class ClientBuilder {
    private httpClient: AxiosInstance;
    private plugins: Plugin[] = [];

    constructor(baseURL: string) {
        this.httpClient = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    }

    public addPlugin(plugin: Plugin): void {
        this.plugins.push(plugin);
    }

    public getHttpClient(): AxiosInstance {
        this.plugins.forEach((plugin) => {
            this.httpClient.interceptors.request.use(plugin);
        });

        return this.httpClient;
    }
}
