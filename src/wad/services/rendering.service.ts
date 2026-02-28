import { ElementRef, inject, Injectable, Signal, signal } from "@angular/core";
import { Coordinate } from "../types/coordinate";

@Injectable({ providedIn: "root" })
export class RenderingService {
    private _height = signal(0);   

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

    setHeight(height: number) {
        this._height.update(h => h = height);
    }
}