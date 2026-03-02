import { Component, inject } from "@angular/core";
import { ElementService } from "../../../wad/elements/element.service";
import { SquareWadModel } from "../../../wad/elements/square";
import { RenderViewComponent } from "../../render-view/render-view.component";
import { TriangleWadModel } from "../../../wad/elements/triangle";
import { coordify } from "../../../wad/rendering/coordinate";

@Component({
    selector: "app-route-test",
    templateUrl: "./test-route.component.html",
    styleUrl: "./test-route.component.css",
    imports: [RenderViewComponent]
})
export class TestRouteComponent {
    private elementService = inject(ElementService);

    elements = [
      new SquareWadModel(10, 10, 50),
      new TriangleWadModel(coordify(60, 60), coordify(110, 60), coordify(110, 110))
    ];
    
    ngOnInit() {
        this.elements.forEach(e => this.elementService.add(e));
    }
}