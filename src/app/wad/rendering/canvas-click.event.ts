import { Coordinate, createCoordinate } from './coordinate';

export class CanvasClickEvent {
  coordinates!: Coordinate;
  constructor(x: number, y: number) {
    this.coordinates = createCoordinate(x, y);
  }
}
