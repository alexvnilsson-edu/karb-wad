import { v7 as uuidV7 } from "uuid"

export class WadElement {
    id!: string;
    type!: string;

    constructor(type: string) {
        this.id = this.generateId();
        this.type = type;
    }

    private generateId(): string {
        return uuidV7();
    }
}