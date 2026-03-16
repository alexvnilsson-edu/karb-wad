import { Coordinates, createCoordinates } from './coordinates.type';

export class CanvasClickEvent {
  coordinates!: Coordinates;
  constructor(x: number, y: number) {
    this.coordinates = createCoordinates(x, y);
  }
}
