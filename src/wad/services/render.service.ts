import { ElementRef, inject, Injectable, Signal, signal } from "@angular/core";
import { coordify, Coordinate } from "../types/coordinate";

@Injectable({ providedIn: "root" })
export class RenderService {
    private _coord = signal(coordify(0, 0));
    private _origin = signal(coordify(0, 0));

    private _height = signal(0);   

    readonly coord = this._coord.asReadonly();
    readonly origin = this._origin.asReadonly();

    readonly height = this._height.asReadonly();

    translateCoordinate(coordinate: Coordinate, target: "canvasian" | "cartesian" = "canvasian"): Coordinate {
        return { x: coordinate.x, y: this.translateYCoordinate(coordinate.y, target) };
    }

    translateCoordinateArray(coordinate: Array<number>, target: "canvasian" | "cartesian" = "canvasian"): Array<number> {
        if (coordinate === undefined || coordinate.length !== 2) {
            throw new Error(`Coordinate array misformed. Two items are required.`);
        }
        if (typeof coordinate[0] !== "number" || typeof coordinate[1] !== "number") {
            throw new TypeError(`Coordinate array misformed. Two items of the number type required.`);
        }

        return [coordinate[0], this.translateYCoordinate(coordinate[1])];
    }

    translateYCoordinate(y: number, target: "canvasian" | "cartesian" = "canvasian"): number {
        if (target === "canvasian") {
            return -(y - this.height());
        } else if (target === "cartesian") {
            return (this.height() - y);
        } else {
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
}