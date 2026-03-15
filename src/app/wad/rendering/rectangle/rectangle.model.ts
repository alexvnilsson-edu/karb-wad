import { Coordinates } from '../coordinate.type';
import { WadElementModel } from '../element.model';

export class RectangleWadElementModel extends WadElementModel {
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
