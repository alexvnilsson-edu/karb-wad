import { Coordinate, createCoordinate } from "../rendering/coordinate";
import { WadModel } from "./element";

export class TriangleWadModel extends WadModel {
    a!: Coordinate;
    b!: Coordinate;
    c!: Coordinate;

    constructor(a: Coordinate, b: Coordinate, c: Coordinate) {
        super("triangle");
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getCoordinates(): Array<Coordinate> {
        return [
            this.a,
            this.b,
            this.c
        ];
    }
}