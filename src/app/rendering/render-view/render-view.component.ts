import { afterEveryRender, afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject, linkedSignal, NO_ERRORS_SCHEMA, signal, ViewContainerRef } from "@angular/core";
import { ElementService } from "@wad/elements/element.service";
import { RenderService } from "@wad/rendering/render.service";
import { WadModel} from "@wad/elements/element";
import { NgComponentOutlet } from "@angular/common";
import { SquareWadElement } from "@wad/rendering/square";
import { WadModule } from "@wad/wad.module";
import { RenderViewStatusComponent } from "./render-view-status/render-view-status.component";
import { coordify } from "@wad/rendering/coordinate";
import { RenderViewSidebarComponent } from "./render-view-sidebar/render-view-sidebar.component";
import { WadElementClickEvent } from "@wad/elements/element-click-event";
import { debounce, fromEvent, interval } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-render-view",
    templateUrl: "./render-view.component.html",
    host: {
        "class": "flex-1 flex flex-col items-stretch",
        "(mousedown)": "mousedown($event)",
        "(mouseup)": "mouseup($event)",
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

    private isMouseDown = false;

    constructor() {
        afterNextRender(() => {
            const canvas = this.getCanvas();
            this.renderService.setHeight(canvas.clientHeight);
        });
    }

    getElementComponent(element: WadModel) {
        console.debug(`[#${this.getElementComponent.name}] ${element.type}#${element.id}`, element);
        switch (element.type) {
            case "square":
                return SquareWadElement;
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

    mousedown(event: MouseEvent) {
        this.isMouseDown = true;
    }

    mouseup(event: MouseEvent) {
        this.isMouseDown = false;
    }

    mousemove(event: MouseEvent) {
        this.renderService.setCoord(coordify(event.offsetX, event.offsetY));

        if (this.isMouseDown) {
            const panCoord = coordify(event.movementX, event.movementY);

            if (panCoord.x !== 0 || panCoord.y !== 0) {
                const coords = coordify(
                    this.renderService.origin().x + panCoord.x,
                    this.renderService.origin().y + panCoord.y
                );
                this.renderService.setOrigin(coords);
            }
        }
    }
}