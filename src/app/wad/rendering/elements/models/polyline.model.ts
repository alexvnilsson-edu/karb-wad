import { Coordinates } from '../../coordinates.type';
import { WadElementModel } from './model';

export class WadPolylineElementModel extends WadElementModel {
  points: Coordinates[] = [];
  constructor(points: Coordinates[]) {
    super('polyline');
    this.points = points;
  }
}
