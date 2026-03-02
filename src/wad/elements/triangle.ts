import { Coordinate } from "../rendering/coordinate";
import { WadElementModel } from "./element-model";

export class TriangleWadModel extends WadElementModel {
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