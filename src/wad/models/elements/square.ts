import { inject, signal, WritableSignal } from "@angular/core";
import { Coordinate } from "../../types/coordinate";
import { WadElement } from "../../models/element";
import { RenderingService } from "../../services/rendering.service";
import { RectangleWadElement } from "./rectangle";

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

    override getCoordinates(): Array<Array<number>> {
        return [
            [this.x, this.y],
            [this.x + this.length, this.y],
            [this.x + this.length, this.y + this.length],
            [this.x, this.y + this.length]
        ];
    }
}