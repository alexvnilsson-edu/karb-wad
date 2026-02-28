import { Component, computed, inject, linkedSignal } from "@angular/core";
import { ElementService } from "../../../wad/services/element.service";

@Component({
    selector: "app-render-view-sidebar",
    templateUrl: "./render-view-sidebar.component.html"
})
export class RenderViewSidebarComponent {
    elementService = inject(ElementService)

    elements = linkedSignal(() => this.elementService.allElements());
}