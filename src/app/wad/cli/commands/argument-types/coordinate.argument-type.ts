import { Coordinate } from 'app/wad/rendering/coordinate';
import { CoordinatesTransformer } from 'app/wad/cli/transformers/coordinates.transformer';
import { ArgumentType } from './argument-type';
import { Transformer } from '../../transformers/transformer';

export class CoordinatesArgumentType extends ArgumentType<Coordinate> {
  override transformer = new CoordinatesTransformer();
  override help: string = 'n..n (example: 100..20)';

  constructor() {
    super('coordinates');
  }

  override transform(value: string): Coordinate {
    return this.transformer.transform(value);
  }
}
