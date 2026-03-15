import { Injectable, linkedSignal, signal } from '@angular/core';
import { Coordinates, createCoordinates } from './coordinate.type';

@Injectable({ providedIn: 'root' })
export class WadRenderService {
  private _coord = signal(createCoordinates(0, 0));
  private _origin = signal(createCoordinates(0, 0));

  private _height = signal(0);

  private _scale = signal(100);

  private _area = signal([0, 0]);

  readonly actualCoord = this._coord.asReadonly();
  readonly coord = linkedSignal(() => this.getCoord());
  readonly origin = this._origin.asReadonly();

  readonly height = this._height.asReadonly();
  readonly scale = this._scale.asReadonly();
  readonly area = this._area.asReadonly();

  canvasClick(x: number, y: number) {
    const [offsetX, offsetY] = this.computeOffsetCoords(x, y);
    // this.commandService.canvasClick.next(new CanvasClickEvent(offsetX, offsetY));
  }

  translateCoordinate(
    coordinate: Coordinates,
    target: 'canvasian' | 'cartesian' = 'canvasian',
  ): Coordinates {
    const [x, y] = coordinate;
    return createCoordinates(x, this.translateCoordinateY(y));
  }

  translateCoordinateY(y: number, target: 'canvasian' | 'cartesian' = 'canvasian'): number {
    switch (target) {
      case 'canvasian':
        return -(y - this.height());
      case 'cartesian':
        return this.height() - y;
      default:
        throw new Error(`Invalid translation target: ${target}`);
    }
  }

  computeOffsetCoords(insetX: number, insetY: number): Coordinates {
    const [originX, originY] = this._origin();
    const x = insetX + originX;
    const y = insetY - originY;
    return createCoordinates(x, y);
  }

  setCoord(coord: Coordinates, canvasian = true) {
    this._coord.set(canvasian ? this.translateCoordinate(coord) : coord);
  }

  /**
   * Returns a coordinate that is offset by origin.
   * @returns Coordinates based on screen coordinates and offset by origin.
   */
  getCoord() {
    const [realCoordX, realCoordY] = this._coord();
    const [originX, originY] = this._origin();
    const x = realCoordX + originX;
    const y = realCoordY - originY;
    return createCoordinates(x, y);
  }

  setOrigin(coord: Coordinates) {
    this._origin.set(coord);
  }

  setHeight(height: number) {
    this._height.set(height);
  }

  setScale(scale: number) {
    if (scale < 100) {
      scale = 100;
    }
    this._scale.set(scale);
  }

  setArea(width: number, height: number) {
    this._area.set([width, height]);
  }
}
