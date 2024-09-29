
import { Fillable } from '../../Fillable';

interface Wage {
    iban: string;
    amount: number;
    description: string;
}

export class RequestRequest extends Fillable(class {}) {
    public merchantId?: string = undefined;
    public amount: number = 0;
    public description: string = '';
    public callback_url: string = '';
    public mobile?: string = undefined;
    public email?: string = undefined;
    public currency?: string = undefined;
    public wages?: Wage[] = undefined;
    public cardPan?: string = undefined;

    constructor(inputs: Partial<RequestRequest> = {}) {
        super();
        this.fill(inputs);
    }

    public validate(): void {
        this.validateMerchantId();
        this.validateAmount();
        this.validateCallbackUrl();
        this.validateMobile();
        this.validateEmail();
        this.validateCurrency();
        this.validateWages();
        this.validateCardPan();
    }

    private validateMerchantId(): void {
        const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
        if (!this.merchantId || !uuidRegex.test(this.merchantId)) {
            throw new Error('Invalid merchant_id format. It should be a valid UUID.');
        }
    }

    private validateAmount(): void {
        if (this.amount <= 0) {
            throw new Error('Amount must be greater than zero.');
        }
    }

    private validateCallbackUrl(): void {
        const urlRegex = /^https?:\/\/.*/;
        if (!urlRegex.test(this.callback_url)) {
            throw new Error('Invalid callback URL format. It should start with http:// or https://.');
        }
    }

    private validateMobile(): void {
        const mobileRegex = /^09[0-9]{9}$/;
        if (this.mobile && !mobileRegex.test(this.mobile)) {
            throw new Error('Invalid mobile number format.');
        }
    }

    private validateEmail(): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.email && !emailRegex.test(this.email)) {
            throw new Error('Invalid email format.');
        }
    }

    private validateCurrency(): void {
        const validCurrencies = ['IRR', 'IRT'];
        if (this.currency && !validCurrencies.includes(this.currency)) {
            throw new Error('Invalid currency format. Allowed values are "IRR" or "IRT".');
        }
    }

    private validateWages(): void {
        const ibanRegex = /^IR[0-9]{2}[0-9A-Z]{1,24}$/;
        if (this.wages) {
            for (const wage of this.wages) {
                if (!wage.iban || !ibanRegex.test(wage.iban)) {
                    throw new Error('Invalid IBAN format in wages.');
                }
                if (!wage.amount || wage.amount <= 0) {
                    throw new Error('Wage amount must be greater than zero.');
                }
                if (!wage.description || wage.description.length > 255) {
                    throw new Error('Wage description must be provided and less than 255 characters.');
                }
            }
        }
    }

    private validateCardPan(): void {
        const cardPanRegex = /^[0-9]{16}$/;
        if (this.cardPan && !cardPanRegex.test(this.cardPan)) {
            throw new Error('Invalid card PAN format. It should be a 16-digit number.');
        }
    }

    public toString(): string {
        this.validate();

        const data: any = {
            merchant_id: this.merchantId,
            amount: this.amount,
            callback_url: this.callback_url,
            description: this.description,
            metadata: {
                mobile: this.mobile,
                email: this.email,
            },
        };

        if (this.currency) {
            data.currency = this.currency;
        }

        if (this.wages) {
            data.wages = this.wages;
        }

        if (this.cardPan) {
            data.metadata.card_pan = this.cardPan;
        }

        return JSON.stringify(data);
    }
}
