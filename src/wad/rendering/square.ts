import { Component, computed, HostBinding, input, NO_ERRORS_SCHEMA, signal } from "@angular/core";
import { WadElement } from "./element";
import { SquareWadModel } from "../elements/square";

@Component({
    selector: `[wad-square]`,
    template: ``,
    host: {
        "[attr.points]": "coordinates()"
    },
    standalone: false
})
export class SquareWadElement extends WadElement<SquareWadModel> {
    coordinates = computed(() => {
        const element = this.getElement();
        if (this.getElement()) {
            const coords = element.getCoordinates().map(coord => this.rendering.translateCoordinate(coord));
            
            return coords;
        } else {
            return [0, 0];
        }
    });
}