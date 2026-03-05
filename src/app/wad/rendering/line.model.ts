import { Coordinate, createCoordinate } from './coordinate';
import { WadModel } from './model';

export class LineWadModel extends WadModel {
  start!: Coordinate;
  end!: Coordinate;

  constructor(startX: number, startY: number, endX: number, endY: number) {
    super('line');
    this.start = createCoordinate(startX, startY);
    this.end = createCoordinate(endX, endY);
  }
}
