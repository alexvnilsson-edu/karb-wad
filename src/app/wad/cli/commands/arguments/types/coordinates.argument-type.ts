import { Coordinates } from 'app/wad/rendering/coordinate.type';
import { WadCoordinatesCommandArgumentTransformer } from '../transformers/coordinates.transformer';
import { WadCommandArgumentType } from './argument-type';

export class WadCoordinatesArgumentType extends WadCommandArgumentType<Coordinates> {
  static TypeName = 'coordinates';

  override transformer = new WadCoordinatesCommandArgumentTransformer();
  override description = 'x..y';
  override example = '56.6..25.5';

  constructor() {
    super(WadCoordinatesArgumentType.TypeName);
  }

  override transform(value: string): Coordinates {
    return this.transformer.transform(value);
  }
}
