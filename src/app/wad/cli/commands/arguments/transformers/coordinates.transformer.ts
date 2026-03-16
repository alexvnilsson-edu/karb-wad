import { Coordinates, createCoordinates } from '../../../../rendering/coordinates.type';
import { WadCommandArgumentTransformer } from './transformer';

export class WadCoordinatesCommandArgumentTransformer extends WadCommandArgumentTransformer<Coordinates> {
  static CoordinateSeparator = '..';

  override name = 'coordinates';

  private separator = WadCoordinatesCommandArgumentTransformer.CoordinateSeparator;

  override transform(value: string): Coordinates {
    if (!value.includes(this.separator)) {
      throw new Error(`Missing separator (..) in input: ${value}`);
    }
    const parts = value.split(this.separator);
    if (parts.length !== 2) {
      throw new Error(`Invalid length of parts of coordinate: ${parts.length}, expected: 2`);
    }
    const coords = parts.map((p) => parseFloat(p));
    if (coords.length !== 2) {
      throw new Error(`Invalid length of parsed coordinates: ${coords.length}, expected: 2`);
    }
    return createCoordinates(coords[0], coords[1]);
  }

  override toString(input: Coordinates): string {
    const [x, y] = input;
    const output = [x, y].join(this.separator);
    return output;
  }
}
