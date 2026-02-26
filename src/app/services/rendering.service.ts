import { ElementRef, inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class RenderingService {
    private canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    setupCanvas(renderViewElement: HTMLElement) {
        const canvas = renderViewElement.querySelector("canvas") as HTMLCanvasElement;

        if (!canvas) {
            throw new Error("Canvas element could not be found.", { cause: RenderingService });
        }

        this.canvas = canvas;

        const context = this.canvas.getContext("2d");
        
        if (!context) {
            throw new Error("Canvas rendering context could not be set up.", { cause: this.canvas });
        }

        this.context = context;
    }
}