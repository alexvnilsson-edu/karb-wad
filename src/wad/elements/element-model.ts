import * as shortUuid from "short-uuid"

export abstract class WadElementModel {
    id!: string;
    type!: string;

    isFocused: boolean = false;

    constructor(type: string) {
        this.id = this.generateId();
        this.type = type;
    }

    abstract getCoordinates(): Array<Array<number>>;

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