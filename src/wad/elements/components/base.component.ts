import { Component, input } from "@angular/core";

@Component({
    selector: "[wad-base]",
    template: ``,
    standalone: false
})
export class BaseWadComponent<TElement> {
    element = input.required<TElement>();
}