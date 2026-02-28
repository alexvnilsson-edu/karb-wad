import { inject, signal, WritableSignal } from "@angular/core";
import { Coordinate } from "../../types/coordinate";
import { WadElement } from "./element";
import { RenderingService } from "../../services/rendering.service";

export class SquareWadElement extends WadElement {
    coordinate!: Coordinate;
    length!: number;

    constructor(x: number, y: number, length: number) {
        super("square");
        this.coordinate = { x: x, y: y };
        this.length = length;
    }
}