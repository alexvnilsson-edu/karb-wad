import { Coordinate, createCoordinate } from '../coordinate.type';
import { WadElementModel } from '../element.model';

export class LineWadElementModel extends WadElementModel {
  start!: Coordinate;
  end!: Coordinate;

  constructor(startX: number, startY: number, endX: number, endY: number) {
    super('line');
    this.start = createCoordinate(startX, startY);
    this.end = createCoordinate(endX, endY);
  }
}
