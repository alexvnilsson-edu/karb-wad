import { afterEveryRender, afterNextRender, Component, effect, ElementRef, inject, signal } from "@angular/core";
import { ElementsService } from "../../services/elements.service";
import { RenderingService } from "../../services/rendering.service";
import { WadElement } from "../../models/element";
import { SquareWadComponent } from "../wad-components/square-wad.component";
import { ErrorWadComponent } from "../wad-components/error-wad.component";
import { NgComponentOutlet } from "@angular/common";

@Component({
    selector: "app-render-view",
    templateUrl: "./render-view.component.html",
    imports: [NgComponentOutlet]
})
export class RenderViewComponent {
    private elementRef = inject(ElementRef);

    private rendering = inject(RenderingService);
    private elementService = inject(ElementsService);

    elements = this.elementService.elements;

    constructor() {
        
    }

    getElementComponent(element: WadElement) {
        console.debug(`[#${this.getElementComponent.name}] ${element.type}#${element.id}`, element);
        switch (element.type) {
            case "square":
                return SquareWadComponent;
            default:
                return null
        }
    }

    getElementComponentInputs(element: WadElement) {
        return { element: element };
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