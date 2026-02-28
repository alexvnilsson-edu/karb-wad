import { Component, computed, HostBinding, input, NO_ERRORS_SCHEMA, signal } from "@angular/core";
import { SquareWadElement } from "../models/square";
import { WadComponent } from "../../components/wad.component";
import { WadModule } from "../../wad.module";
import { coordify } from "../../types/coordinate";

@Component({
    selector: `[wad-square]`,
    template: ``,
    host: {
        "[attr.x]": "coordinate()?.x || 0",
        "[attr.y]": "coordinate()?.y || 0",
        "[attr.width]": "length()",
        "[attr.height]": "length()",
    },
    standalone: false
})
export class SquareWadComponent extends WadComponent<SquareWadElement> {
    coordinate = computed(() => {
        if (this.getElement()) {
            const coord = this.rendering.translateCoordinate(this.getElement().coordinate);

            // Required to fully invert positioning.
            return coordify(coord.x, coord.y - this.getElement().length);
        } else {
            return { x: 0, y: 0 };
        }
    });

    length = computed(() => {
        if (this.getElement()) {
            return this.getElement().length
        } else { 
            return 0
        }
    });

    constructor() {
        super();
    }
}