
import { Fillable } from '../../Fillable';

export class UnverifiedRequest extends Fillable(class {}) {
    public merchantId?: string = undefined;

    constructor(inputs: Partial<UnverifiedRequest> = {}) {
        super();
        this.fill(inputs);
    }

    public validate(): void {
        this.validateMerchantId();
    }

    private validateMerchantId(): void {
        const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
        if (!this.merchantId || !uuidRegex.test(this.merchantId)) {
            throw new Error('Invalid merchant_id format. It should be a valid UUID.');
        }
    }

    public toString(): string {
        this.validate();

        return JSON.stringify({
            merchant_id: this.merchantId,
        });
    }
}
