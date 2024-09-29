
import { Fillable } from '../../Fillable';

export class TransactionListRequest extends Fillable(class {}) {
    public terminalId: string = '';
    public filter?: string = undefined; // Optional filter: PAID, VERIFIED, TRASH, ACTIVE, REFUNDED
    public id?: string = undefined;
    public referenceId?: string = undefined;
    public rrn?: string = undefined;
    public cardPan?: string = undefined;
    public email?: string = undefined;
    public mobile?: string = undefined;
    public description?: string = undefined;

    constructor(inputs: Partial<TransactionListRequest> = {}) {
        super();
        this.fill(inputs);
    }

    public validate(): void {
        if (!this.terminalId) {
            throw new Error('Terminal ID is required.');
        }
    }

    public toGraphQL(): string {
        this.validate();

        return JSON.stringify(
            {
                query: `
                    query Sessions(
                        $terminal_id: ID!,
                        $filter: FilterEnum,
                        $id: ID,
                        $reference_id: String,
                        $rrn: String,
                        $card_pan: String,
                        $email: String,
                        $mobile: CellNumber,
                        $description: String
                    ) {
                        Session(
                            terminal_id: $terminal_id,
                            filter: $filter,
                            id: $id,
                            reference_id: $reference_id,
                            rrn: $rrn,
                            card_pan: $card_pan,
                            email: $email,
                            mobile: $mobile,
                            description: $description
                        ) {
                            id,
                            status,
                            amount,
                            description,
                            created_at
                        }
                    }
                `,
                variables: {
                    terminal_id: this.terminalId,
                    filter: this.filter,
                    id: this.id,
                    reference_id: this.referenceId,
                    rrn: this.rrn,
                    card_pan: this.cardPan,
                    email: this.email,
                    mobile: this.mobile,
                    description: this.description,
                },
            },
            null,
            2
        );
    }
}
