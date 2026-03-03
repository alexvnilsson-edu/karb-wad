import { signal } from "@angular/core";
import { RenderService } from "./render.service";
import { createCoordinate } from "./coordinate";

describe("RenderService", () => {
    let service: RenderService;

    beforeEach(() => {
        service = new RenderService();
    });

    it("should get coordinate with offset", () => {
        service.setHeight(500);
        service.setCoord(createCoordinate(100, 100));
        service.setOrigin(createCoordinate(-50, -50));
        const [x, y] = service.getCoord();
        expect(y).toBe(150);
    });
});