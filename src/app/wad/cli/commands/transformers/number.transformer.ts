import { WadCommandTransformer } from "./transformer";

export class WadNumberTransformer extends WadCommandTransformer<number> {
    constructor() {
        super("number");
    }

    to(input: string) {
        return Number.parseFloat(input);
    }

    from(input: number): string {
        return input.toString();
    }
}