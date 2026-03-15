import { Coordinate } from '../coordinate.type';
import { WadElementModel } from '../element.model';

export class RectangleWadElementModel extends WadElementModel {
  a!: Coordinate;
  b!: Coordinate;
  c!: Coordinate;
  d!: Coordinate;

  constructor(a: Coordinate, b: Coordinate, c: Coordinate, d: Coordinate) {
    super('rectangle');
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  getCoordinates(): Coordinate[] {
    return [this.a, this.b, this.c, this.d];
  }
}
