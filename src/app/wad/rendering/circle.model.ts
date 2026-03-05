import { WadModel } from './model';

export class CircleWadModel extends WadModel {
  x!: number;
  y!: number;
  radius!: number;

  constructor(x: number, y: number, radius: number) {
    super('circle');
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}
