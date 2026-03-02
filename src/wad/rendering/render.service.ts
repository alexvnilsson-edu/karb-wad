import { ElementRef, inject, Injectable, Signal, signal } from "@angular/core";
import { Coordinate, createCoordinate } from "./coordinate";

@Injectable({ providedIn: "root" })
export class RenderService {
    private _coord = signal(createCoordinate(0, 0));
    private _origin = signal(createCoordinate(0, 0));

    private _height = signal(0);

    private _area = signal([0, 0]);

    readonly coord = this._coord.asReadonly();
    readonly origin = this._origin.asReadonly();

    readonly height = this._height.asReadonly();
    readonly area = this._area.asReadonly();

    translateCoordinate(coordinate: Coordinate, target: "canvasian" | "cartesian" = "canvasian"): Coordinate {
        const [x, y] = coordinate;
        return createCoordinate(x, this.translateCoordinateY(y));
    }

    translateCoordinateY(y: number, target: "canvasian" | "cartesian" = "canvasian"): number {
        switch (target) {
            case "canvasian":
                return -(y - this.height());
            case "cartesian":
                return (this.height() - y);
            default:
                throw new Error(`Invalid translation target: ${target}`);
        }
    }

    setCoord(coord: Coordinate, canvasian: boolean = true) {
        this._coord.set(canvasian ? this.translateCoordinate(coord) : coord);
    }

    setOrigin(coord: Coordinate) {
        this._origin.set(coord);
    }

    setHeight(height: number) {
        this._height.update(h => h = height);
    }

    setArea(width: number, height: number) {
        this._area.set([width, height]);
    }
}