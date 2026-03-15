import { Coordinate } from '../coordinate.type';
import { WadElementModel } from '../element.model';

export class TriangleWadElementModel extends WadElementModel {
  a!: Coordinate;
  b!: Coordinate;
  c!: Coordinate;

  constructor(a: Coordinate, b: Coordinate, c: Coordinate) {
    super('triangle');
    this.a = a;
    this.b = b;
    this.c = c;
  }

  getCoordinates(): Coordinate[] {
    return [this.a, this.b, this.c];
  }
}
