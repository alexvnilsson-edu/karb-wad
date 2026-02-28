import { Component, computed, inject, linkedSignal } from "@angular/core";
import { ElementsService } from "../../../wad/services/elements.service";

@Component({
    selector: "app-render-view-sidebar",
    templateUrl: "./render-view-sidebar.component.html"
})
export class RenderViewSidebarComponent {
    elementsService = inject(ElementsService)

    elements = linkedSignal(() => this.elementsService.allElements());
}