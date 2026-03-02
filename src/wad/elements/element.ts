import { Coordinate } from "@wad/rendering/coordinate";
import * as shortUuid from "short-uuid"

export abstract class WadModel {
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
        return shortUuid.generate();
    }
}