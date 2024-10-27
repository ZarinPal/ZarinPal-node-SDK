export class ResponseException extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'ResponseException';
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ResponseException);
      }
    }
  
    public getStatusCode(): number {
      return this.statusCode;
    }
  }
  