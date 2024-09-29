
import { Fillable } from '../../Fillable';

export class RequestResponse extends Fillable(class {}) {
    public authority: string = '';
    public code: number = 0;
    public message: string = '';
    public fee_type: string = '';
    public fee: number = 0;
    public amount: number = 0;
    public status: string = '';

    constructor(inputs: Partial<RequestResponse> = {}) {
        super();
        this.fill(inputs);
    }
}
