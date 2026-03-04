import { Component, computed, Inject, inject, linkedSignal } from "@angular/core";
import { WadElement } from "./element";
import { CircleWadModel } from "../elements/circle";
import { createCoordinate } from "./coordinate";
import { RenderService } from "./render.service";

@Component({
    selector: "[wad-circle]",
    template: ``,
    host: {
        "[attr.cx]": "x$()",
        "[attr.cy]": "y$()",
        "[attr.r]": "radius$()"
    },
    standalone: false,
})
export class CircleleWadElement extends WadElement<CircleWadModel> {
    x$ = linkedSignal(() => this.getElement().x);
    y$ = linkedSignal(() => this.rendering.translateCoordinateY(this.getElement().y));
    radius$ = linkedSignal(() => this.getElement().radius);
}