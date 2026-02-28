import { v7 as uuidV7 } from "uuid"

export class WadElement {
    id!: string;
    type!: string;

    isFocused: boolean = false;

    constructor(type: string) {
        this.id = this.generateId();
        this.type = type;
    }

    focus() {
        this.isFocused = true;
    }

    defocus() {
        this.isFocused = false;
    }

    private generateId(): string {
        return uuidV7();
    }
}