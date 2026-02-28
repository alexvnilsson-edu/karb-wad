import { Component, computed, inject } from "@angular/core";
import { ElementsService } from "../../../wad/services/elements.service";

@Component({
    selector: "app-render-view-sidebar",
    templateUrl: "./render-view-sidebar.component.html"
})
export class RenderViewSidebarComponent {
    elementsService = inject(ElementsService)

    elements = computed(() => {
        if (!this.elementsService.elements()) {
            return [];
        }

        return this.elementsService.elements();
    });
}