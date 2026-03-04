import { inject, signal, WritableSignal } from "@angular/core";
import { Coordinate, createCoordinate } from "../rendering/coordinate";
import { WadModel } from "./element";
import { RenderService } from "../rendering/render.service";
import { RectangleWadElement } from "../models/elements/rectangle";

export class LineWadModel extends WadModel {
    start!: Coordinate;
    end!: Coordinate;
    radius!: number;

    constructor(startX: number, startY: number, endX: number, endY: number) {
        super("line");
        this.start = createCoordinate(startX, startY);
        this.end = createCoordinate(endX, endY);
    }
}