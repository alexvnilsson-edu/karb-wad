import { Coordinate, createCoordinate } from "../rendering/coordinate";
import { WadModel } from "./element";

export class RectangleWadModel extends WadModel {
    a!: Coordinate;
    b!: Coordinate;
    c!: Coordinate;
    d!: Coordinate;

    constructor(a: Coordinate, b: Coordinate, c: Coordinate, d: Coordinate) {
        super("rectangle");
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    getCoordinates(): Array<Coordinate> {
      return [this.a, this.b, this.c, this.d];
    }
}
