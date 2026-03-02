import { Component, computed, inject, linkedSignal } from "@angular/core";
import { RenderService } from "../../../wad/services/render.service";
import { coordify } from "../../../wad/types/coordinate";

@Component({
    selector: "app-render-view-status",
    templateUrl: "./render-view-status.component.html"
})
export class RenderViewStatusComponent {
    private rendering = inject(RenderService);

    coord = linkedSignal(() => {
        if (!this.rendering.coord()) {
            return coordify(0, 0);
        }

        return this.rendering.coord();
    });

    origin = linkedSignal(() => {
        if (!this.rendering.origin()) {
            return coordify(0, 0);
        }

        return this.rendering.origin();
    })
}