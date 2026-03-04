import { createCoordinate } from "../../../rendering/coordinate";
import {WadCoordinateTransformer} from "./coordinate.transformer";

describe("CoordinateTransformer", () => {
    let transformer: WadCoordinateTransformer;
    beforeEach(() => {
        transformer = new WadCoordinateTransformer();
    });
    it("should transform string to Coordinate", () => {
        const input = "25..50";
        const result = transformer.to(input);
        expect(result).not.toBeUndefined();
        expect(result).toStrictEqual(createCoordinate(25, 50));
    });
    it("should transform Coordinate to string", () => {
        const input = createCoordinate(25, 50);
        const result = transformer.from(input);
        expect(result).not.toBeUndefined();
        expect(result).toEqual("25..50");
    });
})