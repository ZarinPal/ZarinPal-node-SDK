// src/endpoint/graphql/requestTypes/RefundRequest.ts

import { Fillable } from '../../Fillable';

export class RefundRequest extends Fillable(class {}) {
    public static readonly METHOD_PAYA = 'PAYA';
    public static readonly METHOD_CARD = 'CARD';

    public static readonly REASON_CUSTOMER_REQUEST = 'CUSTOMER_REQUEST';
    public static readonly REASON_DUPLICATE_TRANSACTION = 'DUPLICATE_TRANSACTION';
    public static readonly REASON_SUSPICIOUS_TRANSACTION = 'SUSPICIOUS_TRANSACTION';
    public static readonly REASON_OTHER = 'OTHER';

    public sessionId: string = '';
    public amount: number = 0;
    public description: string = '';
    public method: string = RefundRequest.METHOD_PAYA; // Default to PAYA for normal refund
    public reason: string = RefundRequest.REASON_CUSTOMER_REQUEST; // Default reason

    constructor(inputs: Partial<RefundRequest> = {}) {
        super();
        this.fill(inputs);
    }

    public validate(): void {
        if (!this.sessionId) {
            throw new Error('Session ID is required.');
        }
        if (this.amount < 20000) {
            throw new Error('Amount must be at least 20000 IRR.');
        }
    }

    public toGraphQL(): string {
        this.validate();

        return JSON.stringify(
            {
                query: `
                    mutation AddRefund($session_id: ID!, $amount: BigInteger!, $description: String, $method: InstantPayoutActionTypeEnum, $reason: RefundReasonEnum) {
                        resource: AddRefund(
                            session_id: $session_id,
                            amount: $amount,
                            description: $description,
                            method: $method,
                            reason: $reason
                        ) {
                            terminal_id,
                            id,
                            amount,
                            timeline {
                                refund_amount,
                                refund_time,
                                refund_status
                            }
                        }
                    }
                `,
                variables: {
                    session_id: this.sessionId,
                    amount: this.amount,
                    description: this.description,
                    method: this.method,
                    reason: this.reason,
                }
            },
            null,
            2
        );
    }
}
