export class RuntimeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RuntimeError';
    }

    toJSON() {
        return this.message;
    }
}
