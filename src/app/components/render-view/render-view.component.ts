import { afterEveryRender, afterNextRender, Component, effect, ElementRef, inject } from "@angular/core";
import { ElementsService } from "../../services/elements.service";
import { RenderingService } from "../../services/rendering.service";

@Component({
    selector: "app-render-view",
    templateUrl: "./render-view.component.html"
})
export class RenderViewComponent {
    private elementRef = inject(ElementRef);

    private rendering = inject(RenderingService);
    private elementService = inject(ElementsService);

    elements = this.elementService.elements;

    constructor() {
        
    }

    protected getCanvas(): HTMLCanvasElement {
        const canvas = this.elementRef.nativeElement.querySelector("svg#renderView");
        if (canvas == undefined) {
            throw new Error("Canvas not found.");
        }
        return canvas;
    }

    protected getCanvasContainer(): HTMLElement {
        const container = this.elementRef.nativeElement.querySelector("div#renderViewContainer");
        if (container == undefined) {
            throw new Error("Canvas Container not found.");
        }
        return container;
    }
}