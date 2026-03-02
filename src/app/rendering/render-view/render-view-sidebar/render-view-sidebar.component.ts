import { Component, computed, inject, linkedSignal } from "@angular/core";
import { ElementStorageService } from "../../../../wad/elements/element-storage.service";

@Component({
    selector: "app-render-view-sidebar",
    templateUrl: "./render-view-sidebar.component.html"
})
export class RenderViewSidebarComponent {
    elementService = inject(ElementStorageService)

    elements = linkedSignal(() => this.elementService.elements());
}