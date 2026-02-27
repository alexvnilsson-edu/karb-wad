import { signal, WritableSignal } from "@angular/core";
import { Coordinate } from "../../types/coordinate";
import { WadElement } from "./element";

export class SquareWadElement extends WadElement {
    private _coordinate: WritableSignal<Coordinate> = signal({ x: 0, y: 0 });
    private _length: WritableSignal<number> = signal(0);

    coordinate = this._coordinate.asReadonly();
    length = this._length.asReadonly();

    constructor(x: number, y: number, length: number) {
        super("square");
        this._coordinate.set({ x: x, y: y });
        this._length.set(length);
    }
}