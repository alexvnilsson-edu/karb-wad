import { Coordinate, createCoordinate } from '../../rendering/coordinate.type';
import { WadArgumentTransformer } from './transformer';

export class WadArgumentCoordinatesTransformer extends WadArgumentTransformer<Coordinate> {
  private separator = '..';

  override transform(value: string): Coordinate {
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
    return createCoordinate(coords[0], coords[1]);
  }

  override toString(input: Coordinate): string {
    const [x, y] = input;
    const output = [x, y].join(this.separator);
    return output;
  }
}
