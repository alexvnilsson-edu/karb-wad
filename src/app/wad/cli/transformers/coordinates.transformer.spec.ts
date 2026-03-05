import { createCoordinate } from '../../rendering/coordinate';
import { CoordinatesTransformer } from './coordinates.transformer';

describe('WadCoordinatesTransformer', () => {
  let transformer: CoordinatesTransformer;
  beforeEach(() => {
    transformer = new CoordinatesTransformer();
  });
  it('should transform string to Coordinate', () => {
    const input = '25..50';
    const result = transformer.transform(input);
    expect(result).not.toBeUndefined();
    expect(result).toStrictEqual(createCoordinate(25, 50));
  });
  it('should transform Coordinate to string', () => {
    const input = createCoordinate(25, 50);
    const result = transformer.toString(input);
    expect(result).not.toBeUndefined();
    expect(result).toEqual('25..50');
  });
});
