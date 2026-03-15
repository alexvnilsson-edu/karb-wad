import { Coordinates, createCoordinates } from '../coordinate.type';
import { WadElementModel } from '../element.model';

export class LineWadElementModel extends WadElementModel {
  start!: Coordinates;
  end!: Coordinates;

  constructor(startX: number, startY: number, endX: number, endY: number) {
    super('line');
    this.start = createCoordinates(startX, startY);
    this.end = createCoordinates(endX, endY);
  }
}
