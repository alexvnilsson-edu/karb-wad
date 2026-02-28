import { Component, computed, inject } from "@angular/core";
import { WadComponent } from "../../components/wad.component";
import { TriangleWadElement } from "../models/triangle";
import { RenderingService } from "../../services/rendering.service";

@Component({
    selector: "[wad-triangle]",
    template: ``,
    host: {
        
    },
    standalone: false,
})
export class TriangleWadComponent extends WadComponent<TriangleWadElement> {
    coordinates = computed(() => {
        const a = this.rendering.translateCoordinate(this.getElement().a);
        const b = this.rendering.translateCoordinate(this.getElement().b);
        const c = this.rendering.translateCoordinate(this.getElement().c);
        return [a, b, c];
    });
}