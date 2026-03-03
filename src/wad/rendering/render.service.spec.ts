import { signal } from "@angular/core";
import { RenderService } from "./render.service";
import { createCoordinate } from "./coordinate";

describe("RenderService", () => {
    let service: RenderService;

    beforeEach(() => {
        service = new RenderService();
    });

    it("should get coordinate with offset", () => {
        const height = 500;
        const coord = 100;
        const origin = -50;
        service.setHeight(height);
        service.setCoord(createCoordinate(coord, coord));
        service.setOrigin(createCoordinate(origin, origin));
        const [x, y] = service.getCoord();
        const expectY = service.translateCoordinateY(coord) + origin;
        expect(y).toBe(expectY);
    });
});