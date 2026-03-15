import { CoordinatesTransformer } from 'app/wad/cli/transformers/coordinates.transformer';
import { Coordinate } from 'app/wad/rendering/coordinate.type';
import { ArgumentType } from './argument-type';

export class CoordinatesArgumentType extends ArgumentType<Coordinate> {
  override transformer = new CoordinatesTransformer();
  override help = 'n..n (example: 100..20)';

  constructor() {
    super('coordinates');
  }

  override transform(value: string): Coordinate {
    return this.transformer.transform(value);
  }
}
