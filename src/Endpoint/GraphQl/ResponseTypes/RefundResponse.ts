// src/endpoint/graphql/responseTypes/RefundResponse.ts

import { Fillable } from '../../Fillable';

interface TimelineEntry {
    refund_amount: number;
    refund_time: string;
    refund_status: string;
}

export class RefundResponse extends Fillable(class {}) {
    public terminalId: string;
    public id: string;
    public amount: number;
    public timeline: TimelineEntry[];

    constructor(data: Partial<RefundResponse>) {
        super();
        this.terminalId = data.terminalId || '';
        this.id = data.id || '';
        this.amount = data.amount || 0;
        this.timeline = data.timeline || [];
    }
}
