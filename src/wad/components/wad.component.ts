import { Component, computed, inject, input, linkedSignal, output, signal } from "@angular/core";
import { WadElement } from "../models/element";
import { RenderService } from "../services/render.service";
import { ElementsService } from "../services/elements.service";
import { WadElementClickEvent } from "../events/wad-element-clicked";

@Component({
    selector: "[wad-base]",
    template: ``,
    host: {
        "[attr.stroke]": "stroke()",
        "(click)": "click($event)"
    },
    standalone: false
})
export class WadComponent<TElement extends WadElement> {
    protected rendering = inject(RenderService);

    element = input.required<WadElement>();

    elementClick = output<WadElementClickEvent>();

    isFocused = linkedSignal(() => this.element()?.isFocused);

    stroke = computed(() => {
        return this.isFocused() ? "rgb(255, 255, 255)" : "rgb(200, 200, 200)"
    });

    protected click(event: MouseEvent) {
        console.debug(`Element ${this.element()?.id || "unknown id"} was clicked.`);

        if (this.element()) {
            const eventData: WadElementClickEvent = { element: this.element()! };
            console.debug(`Emitting event elementClick with data: `, eventData);
            this.elementClick.emit(eventData);
        }
    }

    protected getElement(): TElement {
        return this.element() as TElement;
    }
}