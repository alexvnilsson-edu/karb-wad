export type Coordinate = Float32Array;

export function createCoordinate(x: number, y: number): Coordinate {
    return new Float32Array([x, y]);
}