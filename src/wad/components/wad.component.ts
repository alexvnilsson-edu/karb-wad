import { Component, inject, input } from "@angular/core";
import { WadElement } from "../elements/models/element";
import { RenderingService } from "../services/rendering.service";

@Component({
    selector: "[wad-base]",
    template: ``,
    host: {
        "stroke": "rgb(225,225,225)"
    },
    standalone: false
})
export class WadComponent<TElement extends WadElement>  {
    protected rendering = inject(RenderingService);

    element = input<WadElement>();

    protected getElement(): TElement {
        return this.element() as TElement;
    }
}