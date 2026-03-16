import { Coordinates, createCoordinates } from '../../coordinates.type';
import { WadBaseElementModel } from './model';

export class WadLineElementModel extends WadBaseElementModel {
  start!: Coordinates;
  end!: Coordinates;

  constructor(startX: number, startY: number, endX: number, endY: number) {
    super('line');
    this.start = createCoordinates(startX, startY);
    this.end = createCoordinates(endX, endY);
  }
}
