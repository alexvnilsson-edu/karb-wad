import { WadModel } from '../../elements/element';

export class RectangleWadElement extends WadModel {
  x!: number;
  y!: number;
  width!: number;
  height!: number;

  constructor(x: number, y: number, width: number, height: number) {
    super('rectangle');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getCoordinates(): Array<Array<number>> {
    return [
      [this.x, this.y],
      [this.x + this.width, this.y],
      [this.x + this.width, this.y + this.height],
      [this.x, this.y + this.height],
    ];
  }
}
