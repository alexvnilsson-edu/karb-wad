import { WadElementModel } from './model';

export class WadCircleElementModel extends WadElementModel {
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
