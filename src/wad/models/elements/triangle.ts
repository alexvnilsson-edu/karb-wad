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
}