import { inject, signal, WritableSignal } from "@angular/core";
import { Coordinate } from "../rendering/coordinate";
import { WadModel } from "./element";
import { RenderService } from "../rendering/render.service";
import { RectangleWadElement } from "../models/elements/rectangle";

export class CircleWadModel extends WadModel {
    x!: number;
    y!: number;
    radius!: number;

    constructor(x: number, y: number, radius: number) {
        super("circle");
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    override getCoordinates(): Array<Array<number>> {
        return [
            [this.x, this.y]
        ];
    }
}