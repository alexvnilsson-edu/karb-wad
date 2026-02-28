import { afterEveryRender, afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject, linkedSignal, NO_ERRORS_SCHEMA, signal } from "@angular/core";
import { ElementsService } from "../../../wad/services/elements.service";
import { RenderingService } from "../../../wad/services/rendering.service";
import { WadElement } from "../../../wad/elements/models/element";
import { NgComponentOutlet } from "@angular/common";
import { SquareWadComponent } from "../../../wad/elements/components/square.component";
import { WadModule } from "../../../wad/wad.module";
import { RenderViewStatusComponent } from "../render-view-status/render-view-status.component";
import { coordify } from "../../../wad/types/coordinate";
import { RenderViewSidebarComponent } from "../render-view-sidebar/render-view-sidebar.component";

@Component({
    selector: "app-render-view",
    templateUrl: "./render-view.component.html",
    host: {
        "(mousemove)": "mousemove($event)"
    },
    imports: [
    WadModule,
    RenderViewStatusComponent,
    RenderViewSidebarComponent
]
})
export class RenderViewComponent {
    private elementRef = inject(ElementRef);

    private rendering = inject(RenderingService);
    private elementService = inject(ElementsService);

    elements = linkedSignal(() => this.elementService.allElements());

    constructor() {
        afterNextRender(() => {
            const canvas = this.getCanvas();
            this.rendering.setHeight(canvas.clientHeight);
        });
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

    onElementClick(element: WadElement) {
        console.debug(`[#${this.onElementClick.name}] ID: ${element.id}`);
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

    mousemove(event: MouseEvent) {
        this.rendering.setCoord(coordify(event.offsetX, event.offsetY));
    }
}