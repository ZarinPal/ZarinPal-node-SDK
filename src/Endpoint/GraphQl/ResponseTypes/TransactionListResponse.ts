// src/endpoint/graphql/responseTypes/TransactionListResponse.ts

import { Fillable } from '../../Fillable';

export class TransactionListResponse extends Fillable(class {}) {
    public id: string;
    public status: string;
    public amount: number;
    public description: string;
    public created_at: string;

    constructor(data: Partial<TransactionListResponse>) {
        super();
        this.id = data.id || '';
        this.status = data.status || '';
        this.amount = data.amount || 0;
        this.description = data.description || '';
        this.created_at = data.created_at || '';
    }
}
