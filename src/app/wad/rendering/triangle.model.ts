import { Coordinate } from './coordinate';
import { WadModel } from './model';

export class TriangleWadModel extends WadModel {
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
