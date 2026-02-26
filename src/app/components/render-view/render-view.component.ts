import { Component, effect, ElementRef, inject } from "@angular/core";
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
        effect(() => {

        },
        { debugName: "elements effect" });
    }

    ngOnInit() {
        this.rendering.setupCanvas(this.elementRef.nativeElement);

        
    }
}