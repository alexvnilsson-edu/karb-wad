import { createCoordinate } from '../../rendering/coordinate.type';
import { WadArgumentCoordinatesTransformer } from './coordinates.transformer';

describe('WadArgumentCoordinatesTransformer', () => {
  let transformer: WadArgumentCoordinatesTransformer;
  beforeEach(() => {
    transformer = new WadArgumentCoordinatesTransformer();
  });
  it('should transform string with integer pair to Coordinate', () => {
    const input = '25..50';
    const result = transformer.transform(input);
    expect(result).not.toBeUndefined();
    expect(result).toStrictEqual(createCoordinate(25, 50));
  });
  it('should transform integer Coordinate pair to string', () => {
    const input = createCoordinate(25, 50);
    const result = transformer.toString(input);
    expect(result).not.toBeUndefined();
    expect(result).toEqual('25..50');
  });
  it('should transform string with float pair to Coordinate', () => {
    const input = '25.5..50.5';
    const result = transformer.transform(input);
    expect(result).not.toBeUndefined();
    expect(result).toStrictEqual(createCoordinate(25.5, 50.5));
  });
  it('should transform float Coordinate pair to string', () => {
    const input = createCoordinate(25.5, 50.5);
    const result = transformer.toString(input);
    expect(result).not.toBeUndefined();
    expect(result).toEqual('25.5..50.5');
  });
});
