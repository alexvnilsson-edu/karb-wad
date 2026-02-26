import { WadElement } from "../wad-element";

export class SquareWadElement extends WadElement {
    x!: number;
    y!: number;
    length!: number;

    constructor(x: number, y: number, length: number) {
        super("square");
        this.x = x;
        this.y = y;
        this.length = length;
    }
}