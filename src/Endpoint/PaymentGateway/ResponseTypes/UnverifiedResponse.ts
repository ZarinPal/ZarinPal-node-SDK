// src/endpoint/paymentGateway/responseTypes/UnverifiedResponse.ts

import { Fillable } from '../../Fillable';

interface Authority {
    authority: string;
    amount: number;
    callback_url: string;
    referer: string;
    date: string;
}

export class UnverifiedResponse extends Fillable(class {}) {
    public code: number = 0;
    public message: string = 'No data received';
    public authorities: Authority[] = [];

    constructor(data: Partial<UnverifiedResponse> = {}) {
        super();

        if (!data || data.code === undefined || data.message === undefined) {
            return;
        }

        this.code = data.code;
        this.message = data.message;

        if (Array.isArray(data.authorities)) {
            this.authorities = data.authorities.map((authorityData) => ({
                authority: authorityData.authority || '',
                amount: authorityData.amount || 0,
                callback_url: authorityData.callback_url || '',
                referer: authorityData.referer || '',
                date: authorityData.date || '',
            }));
        }
    }
}
