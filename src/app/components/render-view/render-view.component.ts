import { Component, inject } from "@angular/core";
import { ElementsService } from "../../services/elements.service";

@Component({
    selector: "app-render-view",
    templateUrl: "./render-view.component.html"
})
export class RenderViewComponent {
    private elementService = inject(ElementsService);

    elements = this.elementService.elements;
    
    ngOnInit() {
        
    }
}