import { Component, computed, linkedSignal } from "@angular/core";
import { WadElement } from "./element";
import { RectangleWadModel } from "../elements/rectangle";
import { createCoordinate } from "./coordinate";

@Component({
    selector: `[wad-rectangle]`,
    template: ``,
    host: {
        "[attr.points]": "coordinates$()"
    },
    standalone: false
})
export class RectangleWadElement extends WadElement<RectangleWadModel> {
    coordinates$ = linkedSignal(() => {
        const element = this.getElement();
        if (this.getElement()) {
            return element.getCoordinates().map(coord => this.rendering.translateCoordinate(coord));
        } else {
            return [createCoordinate(0, 0)];
        }
    });
}