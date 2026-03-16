import { Coordinates } from '../../coordinates.type';
import { WadBaseElementModel } from './model';

export class WadRectangleElementModel extends WadBaseElementModel {
  a!: Coordinates;
  b!: Coordinates;
  c!: Coordinates;
  d!: Coordinates;

  constructor(a: Coordinates, b: Coordinates, c: Coordinates, d: Coordinates) {
    super('rectangle');
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  getCoordinates(): Coordinates[] {
    return [this.a, this.b, this.c, this.d];
  }
}
