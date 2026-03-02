import { Coordinate } from "../rendering/coordinate";
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

    override getCoordinates(): Array<Array<number>> {
        return [
            [this.a.x, this.a.y],
            [this.b.x, this.b.y],
            [this.c.x, this.c.y]
        ];
    }
}