import { Component, computed, inject, linkedSignal } from "@angular/core";
import { WadElement } from "./element";
import { CircleWadModel } from "../elements/circle";
import { coordify } from "./coordinate";

@Component({
    selector: "[wad-circle]",
    template: ``,
    host: {
        "[attr.points]": "points()"
    },
    standalone: false,
})
export class CircleleWadElement extends WadElement<CircleWadModel> {
    coordinates = computed(() => {
        if (!this.getElement()) {
            return [coordify(0, 0), coordify(0, 0), coordify(0, 0)]
        }

        const x = this.getElement().x;
        const y = this.rendering.translateYCoordinate(this.getElement().y);
        return [x, y];
    });

    x = linkedSignal(() => this.getElement().x);
    y = linkedSignal(() => this.getElement().y);
    radius = linkedSignal(() => this.getElement().radius);
}