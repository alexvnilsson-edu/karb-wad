import { Coordinates, createCoordinates } from '../../coordinates.type';
import { WadElementModel } from './model';

export class WadLineElementModel extends WadElementModel {
  start!: Coordinates;
  end!: Coordinates;

  constructor(startX: number, startY: number, endX: number, endY: number) {
    super('line');
    this.start = createCoordinates(startX, startY);
    this.end = createCoordinates(endX, endY);
  }
}
