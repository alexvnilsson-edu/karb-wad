import { Component, input } from "@angular/core";
import { WadElement } from "../elements/models/element";

@Component({
    selector: "[wad-base]",
    template: ``,
    standalone: false
})
export class WadComponent<TElement extends WadElement>  {
    element = input<WadElement>();

    protected getElement(): TElement {
        return this.element() as TElement;
    }
}