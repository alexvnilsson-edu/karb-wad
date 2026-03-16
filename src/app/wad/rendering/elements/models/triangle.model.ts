import { Coordinates } from '../../coordinates.type';
import { WadBaseElementModel } from './model';

export class WadTriangleElementModel extends WadBaseElementModel {
  a!: Coordinates;
  b!: Coordinates;
  c!: Coordinates;

  constructor(a: Coordinates, b: Coordinates, c: Coordinates) {
    super('triangle');
    this.a = a;
    this.b = b;
    this.c = c;
  }

  getCoordinates(): Coordinates[] {
    return [this.a, this.b, this.c];
  }
}
