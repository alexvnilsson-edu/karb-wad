import { inject, signal, WritableSignal } from "@angular/core";
import { Coordinate, createCoordinate } from "../rendering/coordinate";
import { WadModel } from "./element";
import { RenderService } from "../rendering/render.service";
import { RectangleWadElement } from "../models/elements/rectangle";

export class SquareWadModel extends WadModel {
    x!: number;
    y!: number;
    length!: number;

    constructor(x: number, y: number, length: number) {
        super("square");
        this.x = x;
        this.y = y;
        this.length = length;
    }

    getCoordinates(): Array<Coordinate> {
        return [
            createCoordinate(this.x, this.y),
            createCoordinate(this.x + this.length, this.y),
            createCoordinate(this.x + this.length, this.y + this.length),
            createCoordinate(this.x, this.y + this.length)
        ];
    }
}