import { Component, inject } from "@angular/core";
import { ElementsService } from "../../../wad/services/elements.service";
import { SquareWadElement } from "../../../wad/models/elements/square";
import { RenderViewComponent } from "../../components/render-view/render-view.component";
import { TriangleWadElement } from "../../../wad/models/elements/triangle";
import { coordify } from "../../../wad/types/coordinate";

@Component({
    selector: "app-route-test",
    templateUrl: "./test-route.component.html",
    styleUrl: "./test-route.component.css",
    imports: [RenderViewComponent]
})
export class TestRouteComponent {
    private elementService = inject(ElementsService);

    elements = [
      new SquareWadElement(10, 10, 50),
      new TriangleWadElement(coordify(60, 60), coordify(110, 60), coordify(110, 110))
    ];
    
    ngOnInit() {
        this.elements.forEach(e => this.elementService.add(e));
    }
}