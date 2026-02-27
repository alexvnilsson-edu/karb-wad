import { ElementRef, inject, Injectable, Signal, signal } from "@angular/core";

class Canvas {
    private _height = signal(0);

    element!: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;

    height = this._height.asReadonly();

    constructor(element: HTMLCanvasElement) {
        if (!element) {
            throw new Error("Canvas element could not be found.", { cause: RenderingService });
        }

        this.element = element;

        const context = this.element.getContext("2d");
        
        if (!context) {
            throw new Error("Canvas rendering context could not be set up.", { cause: this.element });
        }

        this.context = context;
    }

    setHeight(height: number) {
        this._height.update(h => h = height);
    }
}

@Injectable({ providedIn: "root" })
export class RenderingService {
    canvas!: Canvas;

    initCanvas(canvas: HTMLCanvasElement) {
        this.canvas = new Canvas(canvas);
    }
}