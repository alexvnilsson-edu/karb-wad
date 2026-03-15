import { TestBed } from '@angular/core/testing';
import { createCoordinates } from './coordinate.type';
import { WadRenderService } from './render.service';

describe('RenderService', () => {
  let service: WadRenderService;

  beforeEach(() => {
    service = TestBed.inject(WadRenderService);
  });

  it('should get coordinate with offset', () => {
    const height = 500;
    const coord = 100;
    const origin = -50;
    service.setHeight(height);
    service.setCoord(createCoordinates(coord, coord));
    service.setOrigin(createCoordinates(origin, origin));
    const [x, y] = service.getCoord();
    const expectY = service.translateCoordinateY(coord) - origin;
    expect(y).toBe(expectY);
  });
});
