import { ElementRef, inject, Injectable, Signal, signal } from "@angular/core";
import { coordify, Coordinate } from "../types/coordinate";

@Injectable({ providedIn: "root" })
export class RenderingService {
    private _coord = signal(coordify(0, 0));
    private _height = signal(0);   

    coord = this._coord.asReadonly();
    height = this._height.asReadonly();

    translateCoordinate(coordinate: Coordinate, target: "canvasian" | "cartesian" = "canvasian"): Coordinate {
        return { x: coordinate.x, y: this.translateYCoordinate(coordinate.y, target) };
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

    setHeight(height: number) {
        this._height.update(h => h = height);
    }
}