export abstract class WadCommandTransformer<T> {
    type!: string;

    /**
     * Construct the transformer class.
     * 
     * @param type Name of the transformer type.
     */
    constructor(type: string) {
        this.type = type;
    }
    
    abstract to(input: string): T;
    abstract from(input: T): string;
}