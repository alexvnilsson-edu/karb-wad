import { Component, input } from "@angular/core";
import { WadElement } from "../models/element";

@Component({
    selector: "[wad-base]",
    template: ``,
    standalone: false
})
export class BaseWadComponent<TElement extends WadElement>  {
    element = input<WadElement>();

    protected getElement(): TElement {
        return this.element() as TElement;
    }
}