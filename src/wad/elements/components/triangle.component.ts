import { Component, computed, inject } from "@angular/core";
import { WadComponent } from "../../components/wad.component";
import { TriangleWadElement } from "../models/triangle";
import { RenderingService } from "../../services/rendering.service";
import { coordify } from "../../types/coordinate";

@Component({
    selector: "[wad-triangle]",
    template: ``,
    host: {
        "[attr.points]": "points()"
    },
    standalone: false,
})
export class TriangleWadComponent extends WadComponent<TriangleWadElement> {
    coordinates = computed(() => {
        if (!this.getElement()) {
            return [coordify(0, 0), coordify(0, 0), coordify(0, 0)]
        }

        const a = this.rendering.translateCoordinate(this.getElement().a);
        const b = this.rendering.translateCoordinate(this.getElement().b);
        const c = this.rendering.translateCoordinate(this.getElement().c);
        return [a, b, c];
    });

    points = computed(() => {
        if (!this.coordinates()) {
            return "";
        }

        const coords = this.coordinates().map(coord => `${coord.x} ${coord.y}`);
        return coords.join(" ")
    })
}