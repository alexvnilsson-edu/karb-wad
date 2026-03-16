import { Coordinates } from '../../coordinates.type';
import { WadBaseElementModel } from './model';

export class WadPolylineElementModel extends WadBaseElementModel {
  points: Coordinates[] = [];
  constructor(points: Coordinates[]) {
    super('polyline');
    this.points = points;
  }
}
