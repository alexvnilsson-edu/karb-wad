import { Coordinate, createCoordinate } from "../rendering/coordinate";
import { WadModel } from "./element";

export class RectangleWadModel extends WadModel {
    x!: number;
    y!: number;
    width!: number;
    height!: number;

    constructor(x: number, y: number, width: number, height: number) {
        super("rectangle");
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getCoordinates(): Array<Coordinate> {
        return [
            createCoordinate(this.x, this.y),
            createCoordinate(this.x + this.width, this.y),
            createCoordinate(this.x + this.width, this.y + this.height),
            createCoordinate(this.x, this.y + this.height)
        ];
    }
}