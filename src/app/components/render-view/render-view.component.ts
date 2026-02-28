import { afterEveryRender, afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject, linkedSignal, NO_ERRORS_SCHEMA, signal, ViewContainerRef } from "@angular/core";
import { ElementService } from "../../../wad/services/element.service";
import { RenderService } from "../../../wad/services/render.service";
import { WadElement } from "../../../wad/models/element";
import { NgComponentOutlet } from "@angular/common";
import { SquareWadComponent } from "../../../wad/components/elements/square.component";
import { WadModule } from "../../../wad/wad.module";
import { RenderViewStatusComponent } from "../render-view-status/render-view-status.component";
import { coordify } from "../../../wad/types/coordinate";
import { RenderViewSidebarComponent } from "../render-view-sidebar/render-view-sidebar.component";
import { WadElementClickEvent } from "../../../wad/events/wad-element-clicked";

@Component({
    selector: "app-render-view",
    templateUrl: "./render-view.component.html",
    host: {
        "class": "flex-1 flex flex-col items-stretch",
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

    private renderService = inject(RenderService);
    private elementService = inject(ElementService);

    elements = linkedSignal(() => this.elementService.allElements());

    constructor() {
        afterNextRender(() => {
            const canvas = this.getCanvas();
            this.renderService.setHeight(canvas.clientHeight);
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

    elementClick(event: WadElementClickEvent) {
        console.debug(`Element clicked: ${event.element.id}`, event);
        this.elementService.focus(event.element);
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
        this.renderService.setCoord(coordify(event.offsetX, event.offsetY));
    }
}