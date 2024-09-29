
import { ZarinPal } from '../../Zarinpal';
import { PaymentGatewayException } from '../../httpClient/Exception/PaymentGatewayException';
import { ResponseException } from '../../httpClient/Exception/ResponseException';
import axios, { AxiosResponse } from 'axios';
import {RequestRequest} from "./RequestTypes/RequestRequest";
import {InquiryRequest} from "./RequestTypes/InquiryRequest";
import {VerifyRequest} from "./RequestTypes/VerifyRequest";
import {ReverseRequest} from "./RequestTypes/ReverseRequest";
import {UnverifiedRequest} from "./RequestTypes/UnverifiedRequest";
import {RequestResponse} from "./ResponseTypes/RequestResponse";
import {VerifyResponse} from "./ResponseTypes/VerifyResponse";
import {UnverifiedResponse} from "./ResponseTypes/UnverifiedResponse";

export class PaymentGateway {
    private static readonly BASE_URL = '/pg/v4/payment/';
    private static readonly START_PAY = '/pg/StartPay/';
    private static readonly REQUEST_URI = `${PaymentGateway.BASE_URL}request.json`;
    private static readonly VERIFY_URI = `${PaymentGateway.BASE_URL}verify.json`;
    private static readonly UNVERIFIED_URI = `${PaymentGateway.BASE_URL}unVerified.json`;
    private static readonly REVERSE_URI = `${PaymentGateway.BASE_URL}reverse.json`;
    private static readonly INQUIRY_URI = `${PaymentGateway.BASE_URL}inquiry.json`;

    private sdk: ZarinPal;

    constructor(sdk: ZarinPal) {
        this.sdk = sdk;
    }

    public async request(request: RequestRequest): Promise<RequestResponse> {
        this.fillMerchantId(request);
        const response = await this.httpHandler(PaymentGateway.REQUEST_URI, request.toString());
        return new RequestResponse(response.data);
    }

    public getRedirectUrl(authority: string): string {
        const baseUrl = this.sdk.getOptions().getBaseUrl();
        return `${baseUrl.replace(/\/$/, '')}${PaymentGateway.START_PAY}${authority}`;
    }

    public async verify(request: VerifyRequest): Promise<VerifyResponse> {
        this.fillMerchantId(request);
        const response = await this.httpHandler(PaymentGateway.VERIFY_URI, request.toString());
        return new VerifyResponse(response.data);
    }

    public async unverified(request: UnverifiedRequest): Promise<UnverifiedResponse> {
        this.fillMerchantId(request);
        const response = await this.httpHandler(PaymentGateway.UNVERIFIED_URI, request.toString());
        return new UnverifiedResponse(response.data);
    }

    public async reverse(request: ReverseRequest): Promise<RequestResponse> {
        this.fillMerchantId(request);
        const response = await this.httpHandler(PaymentGateway.REVERSE_URI, request.toString());
        return new RequestResponse(response.data);
    }

    public async inquiry(request: InquiryRequest): Promise<RequestResponse> {
        this.fillMerchantId(request);
        const response = await this.httpHandler(PaymentGateway.INQUIRY_URI, request.toString());
        return new RequestResponse(response.data);
    }

    private fillMerchantId(request: any): void {
        if (!request.merchantId) {
            request.merchantId = this.sdk.getMerchantId();
        }
    }

    private async httpHandler(uri: string, body: any): Promise<any> {
        try {
            const fullUri = `${this.sdk.getOptions().getBaseUrl()}${uri}`;
            const response: AxiosResponse = await this.sdk.getHttpClient().post(fullUri, body);
            this.checkHttpError(response);
            return response.data;
        } catch (e: any) {
            if (e.response) {
                throw new ResponseException(e.response.data.message, e.response.status);
            } else if (e.request) {
                throw new ResponseException('No response received from server', -99);
            } else {
                throw new ResponseException(`Request failed: ${e.message}`, -99);
            }
        }
    }

    private checkHttpError(response: AxiosResponse): void {
        const statusCode = response.status;
        if (statusCode !== 200) {
            const { message, code } = response.data.errors ?? {
                message: `HTTP Error: ${response.statusText}`,
                code: statusCode,
            };
            throw new ResponseException(message, code);
        }
    }

    private checkPaymentGatewayError(response: any): any {
        if (response.errors || !response.data) {
            throw new PaymentGatewayException(response.errors || { message: 'Unknown error', code: -1 });
        }
        return response;
    }
}
