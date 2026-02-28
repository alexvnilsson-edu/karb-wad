import { Component, computed, inject } from "@angular/core";
import { RenderingService } from "../../../wad/services/rendering.service";
import { coordify } from "../../../wad/types/coordinate";

@Component({
    selector: "app-render-view-status",
    templateUrl: "./render-view-status.component.html"
})
export class RenderViewStatusComponent {
    private rendering = inject(RenderingService);

    coord = computed(() => {
        if (!this.rendering.coord()) {
            return coordify(0, 0);
        }

        return this.rendering.coord();
    });
}