import { WadArgumentCoordinatesTransformer } from 'app/wad/cli/transformers/coordinates.transformer';
import { Coordinate } from 'app/wad/rendering/coordinate.type';
import { WadArgumentType } from './argument-type';

export class WadCoordinatesArgumentType extends WadArgumentType<Coordinate> {
  override transformer = new WadArgumentCoordinatesTransformer();
  override description = 'x..y';
  override example = '56.6..25.5';

  constructor() {
    super('coordinates');
  }

  override transform(value: string): Coordinate {
    return this.transformer.transform(value);
  }
}
