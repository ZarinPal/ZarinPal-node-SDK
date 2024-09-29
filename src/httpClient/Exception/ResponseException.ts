
export class ResponseException extends Error {
    constructor(message: string, public code?: number) {
        super(message);
        this.name = 'ResponseException';
        this.code = code;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
