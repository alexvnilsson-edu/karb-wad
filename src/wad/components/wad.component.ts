import { Component, computed, inject, input, signal } from "@angular/core";
import { WadElement } from "../elements/models/element";
import { RenderingService } from "../services/rendering.service";

@Component({
    selector: "[wad-base]",
    template: ``,
    host: {
        "[attr.stroke]": "stroke()"
    },
    standalone: false
})
export class WadComponent<TElement extends WadElement>  {
    private _active = signal(false);

    protected rendering = inject(RenderingService);

    element = input<WadElement>();

    active = this._active.asReadonly();

    stroke = computed(() => {
        return this.active() ? "rgb(255, 255, 255)" : "rgb(200, 200, 200)"
    });

    protected getElement(): TElement {
        return this.element() as TElement;
    }
}