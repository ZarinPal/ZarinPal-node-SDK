
type Constructor<T = {}> = new (...args: any[]) => T;

export function Fillable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
            const inputs = args[0] as Record<string, any> | undefined;
            if (inputs) {
                this.fill(inputs);
            }
        }

        public fill(inputs: Record<string, any>): this {
            for (const key of Object.keys(inputs)) {
                if (this.hasProperty(key)) {
                    (this as any)[key] = inputs[key];
                }
            }
            return this;
        }

        private hasProperty(name: string): boolean {
            return name in this;
        }

        public getProperty(name: string): any {
            return (this as any)[name];
        }

        public setProperty(name: string, value: any): void {
            (this as any)[name] = value;
        }
    };
}
