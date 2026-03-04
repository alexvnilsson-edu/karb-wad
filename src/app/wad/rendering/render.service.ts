import { ElementRef, inject, Injectable, linkedSignal, output, Signal, signal } from "@angular/core";
import { Coordinate, createCoordinate } from "./coordinate";
import { CanvasClickEvent } from "./canvas-click.event";
import { EventEmitter } from "stream";
import { Subject } from "rxjs";
import { WadCommandService } from "../cli/commands/command.service";

@Injectable({ providedIn: "root" })
export class RenderService {
    private commandService = inject(WadCommandService);

    private _coord = signal(createCoordinate(0, 0));
    private _origin = signal(createCoordinate(0, 0));

    private _height = signal(0);

    private _area = signal([0, 0]);

    readonly actualCoord = this._coord.asReadonly();
    readonly coord = linkedSignal(() => this.getCoord());
    readonly origin = this._origin.asReadonly();

    readonly height = this._height.asReadonly();
    readonly area = this._area.asReadonly();

    canvasClick(x: number, y: number) {
        this.commandService.canvasClick.next(new CanvasClickEvent(x, y));
    }

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

    /**
     * Returns a coordinate that is offset by origin.
     * @returns Coordinates based on screen coordinates and offset by origin.
     */
    getCoord() {
        const [realCoordX, realCoordY] = this._coord();
        const [originX, originY] = this._origin();
        const x = realCoordX + originX;
        const y = realCoordY - originY;
        return createCoordinate(x, y);
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
