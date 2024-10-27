export class Validator {
    public static validateMerchantId(merchantId: string | null): void {
        if (
            merchantId === null ||
            !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(merchantId)
        ) {
            throw new Error('Invalid merchant_id format. It should be a valid UUID.');
        }
    }

    public static validateAuthority(authority: string): void {
        if (!/^[AS][0-9a-zA-Z]{35}$/.test(authority)) {
          throw new Error('Invalid authority format. It should be a string starting with "A" or "S" followed by 35 alphanumeric characters.');
        }
      }

    public static validateAmount(amount: number, minAmount: number = 1000): void {
        if (amount < minAmount) {
            throw new Error(`Amount must be at least ${minAmount}.`);
        }
    }

    public static validateCallbackUrl(callbackUrl: string): void {
        if (!/^https?:\/\/.*$/.test(callbackUrl)) {
            throw new Error('Invalid callback URL format. It should start with http:// or https://.');
        }
    }

    public static validateMobile(mobile: string | null): void {
        if (mobile !== null && !/^09[0-9]{9}$/.test(mobile)) {
            throw new Error('Invalid mobile number format.');
        }
    }

    public static validateEmail(email: string | null): void {
        if (email !== null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email format.');
        }
    }

    public static validateCurrency(currency: string | null): void {
        const validCurrencies: string[] = ['IRR', 'IRT'];
        if (currency !== null && validCurrencies.indexOf(currency) === -1) {
            throw new Error('Invalid currency format. Allowed values are "IRR" or "IRT".');
        }
    }

    public static validateWages(wages: Array<{ iban: string, amount: number, description: string }> | null): void {
        if (wages !== null) {
            for (const wage of wages) {
                if (!/^[A-Z]{2}[0-9]{2}[0-9A-Z]{1,30}$/.test(wage.iban)) {
                    throw new Error('Invalid IBAN format in wages.');
                }
                if (wage.amount <= 0) {
                    throw new Error('Wage amount must be greater than zero.');
                }
                if (wage.description.length > 255) {
                    throw new Error('Wage description must be provided and less than 255 characters.');
                }
            }
        }
    }

    public static validateTerminalId(terminalId: string): void {
        if (!terminalId) {
            throw new Error('Terminal ID is required.');
        }
    }

    public static validateFilter(filter: string | null): void {
        const validFilters: string[] = ['PAID', 'VERIFIED', 'TRASH', 'ACTIVE', 'REFUNDED'];
        if (filter !== null && validFilters.indexOf(filter) === -1) {
            throw new Error('Invalid filter value.');
        }
    }

    public static validateLimit(limit: number | null): void {
        if (limit !== null && limit <= 0) {
            throw new Error('Limit must be a positive integer.');
        }
    }

    public static validateOffset(offset: number | null): void {
        if (offset !== null && offset < 0) {
            throw new Error('Offset must be a non-negative integer.');
        }
    }

    public static validateCardPan(cardPan: string | null): void {
        if (cardPan !== null && !/^[0-9]{16}$/.test(cardPan)) {
            throw new Error('Invalid card PAN format. It should be a 16-digit number.');
        }
    }

    public static validateSessionId(sessionId: string): void {
        if (!sessionId) {
            throw new Error('Session ID is required.');
        }
    }

    public static validateMethod(method: string): void {
        const validMethods: string[] = ['PAYA', 'CARD'];
        if (validMethods.indexOf(method) === -1) {
            throw new Error('Invalid method. Allowed values are "PAYA" or "CARD".');
        }
    }

    public static validateReason(reason: string): void {
        const validReasons: string[] = [
            'CUSTOMER_REQUEST',
            'DUPLICATE_TRANSACTION',
            'SUSPICIOUS_TRANSACTION',
            'OTHER'
        ];
        if (validReasons.indexOf(reason) === -1) {
            throw new Error('Invalid reason. Allowed values are "CUSTOMER_REQUEST", "DUPLICATE_TRANSACTION", "SUSPICIOUS_TRANSACTION", or "OTHER".');
        }
    }

}