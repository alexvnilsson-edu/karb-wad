import { WadElementModel } from '../element.model';

export class CircleWadElementModel extends WadElementModel {
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
