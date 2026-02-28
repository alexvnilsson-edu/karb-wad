import { Coordinate } from "../../types/coordinate";
import { WadElement } from "../../models/element";

export class TriangleWadElement extends WadElement {
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