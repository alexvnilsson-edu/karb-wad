import { Coordinate, createCoordinate } from "../../../rendering/coordinate";
import { WadCommandTransformer } from "./transformer";

export class WadCoordinatesTransformer extends WadCommandTransformer<Coordinate> {
    private separator = "..";

    constructor() {
        super("coordinates");
    }
    
    override to(input: string): Coordinate {
        if (!input.includes(this.separator)) {
            throw new Error(`Missing separator (..) in input: ${input}`);
        }
        const parts = input.split(this.separator);
        if (parts.length !== 2) {
            throw new Error(`Invalid length of parts of coordinate: ${parts.length}, expected: 2`)
        }
        const coords = parts.map(p => parseFloat(p));
        if (coords.length !== 2) {
            throw new Error(`Invalid length of parsed coordinates: ${coords.length}, expected: 2`);
        }
        return createCoordinate(coords[0], coords[1]);
    }
    override from(input: Coordinate): string {
        const [x, y] = input;
        const output = [x, y].join(this.separator);
        return output;
    }
}