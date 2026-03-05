import { Coordinate, createCoordinate } from './coordinate.type';

export class CanvasClickEvent {
  coordinates!: Coordinate;
  constructor(x: number, y: number) {
    this.coordinates = createCoordinate(x, y);
  }
}
