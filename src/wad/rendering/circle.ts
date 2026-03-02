import { Component, computed, inject, linkedSignal } from "@angular/core";
import { WadElement } from "./element";
import { CircleWadModel } from "../elements/circle";
import { createCoordinate } from "./coordinate";

@Component({
    selector: "[wad-circle]",
    template: ``,
    host: {
        "[attr.cx]": "x()",
        "[attr.cy]": "y()",
        "[attr.r]": "radius()"
    },
    standalone: false,
})
export class CircleleWadElement extends WadElement<CircleWadModel> {
    coordinates = computed(() => {
        if (!this.getElement()) {
            return [createCoordinate(0, 0), createCoordinate(0, 0), createCoordinate(0, 0)]
        }

        const x = this.getElement().x;
        const y = this.rendering.translateCoordinateY(this.getElement().y);
        return [x, y];
    });

    x = linkedSignal(() => this.getElement().x);
    y = linkedSignal(() => this.getElement().y);
    radius = linkedSignal(() => this.getElement().radius);
}