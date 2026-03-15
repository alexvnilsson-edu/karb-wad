export type Coordinates = Float32Array;

export function createCoordinates(x: number, y: number): Coordinates {
  return new Float32Array([x, y]);
}
