export declare class Validator {
    static validateMerchantId(merchantId: string | null): void;
    static validateAuthority(authority: string): void;
    static validateAmount(amount: number, minAmount?: number): void;
    static validateCallbackUrl(callbackUrl: string): void;
    static validateMobile(mobile: string | null): void;
    static validateEmail(email: string | null): void;
    static validateCurrency(currency: string | null): void;
    static validateWages(wages: Array<{
        iban: string;
        amount: number;
        description: string;
    }> | null): void;
    static validateTerminalId(terminalId: string): void;
    static validateFilter(filter: string | null): void;
    static validateLimit(limit: number | null): void;
    static validateOffset(offset: number | null): void;
    static validateCardPan(cardPan: string | null): void;
    static validateSessionId(sessionId: string): void;
    static validateMethod(method: string): void;
    static validateReason(reason: string): void;
}
