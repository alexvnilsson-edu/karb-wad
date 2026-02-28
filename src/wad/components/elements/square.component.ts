import { Component, computed, HostBinding, input, NO_ERRORS_SCHEMA, signal } from "@angular/core";
import { SquareWadElement } from "../../models/elements/square";
import { WadComponent } from "../wad.component";
import { WadModule } from "../../wad.module";
import { coordify } from "../../types/coordinate";

@Component({
    selector: `[wad-square]`,
    template: ``,
    host: {
        "[attr.points]": "coordinates()"
    },
    standalone: false
})
export class SquareWadComponent extends WadComponent<SquareWadElement> {
    coordinates = computed(() => {
        const element = this.getElement();
        if (this.getElement()) {
            const coords = element.getCoordinates().map(coord => this.rendering.translateCoordinateArray(coord));
            
            return coords;
        } else {
            return [0, 0];
        }
    });
}