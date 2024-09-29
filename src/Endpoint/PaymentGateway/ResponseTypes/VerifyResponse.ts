// src/endpoint/paymentGateway/responseTypes/VerifyResponse.ts

import { Fillable } from '../../Fillable';

export class VerifyResponse extends Fillable(class {}) {
    public authority: string = '';
    public code: number = 0;
    public message: string = '';
    public ref_id: string = '';
    public card_pan: string = '';
    public card_hash: string = '';
    public fee_type: string = '';
    public fee: string = '';

    constructor(inputs: Partial<VerifyResponse> = {}) {
        super();
        this.fill(inputs);
    }
}
