export function coordify(x: number, y: number): Coordinate {
    return { x, y };
}

export interface Coordinate {
    x: number;
    y: number;
}