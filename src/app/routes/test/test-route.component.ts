import { Component, inject } from "@angular/core";
import { ElementsService } from "../../../wad/services/elements.service";
import { SquareWadElement } from "../../../wad/elements/models/square";
import { RenderViewComponent } from "../../components/render-view/render-view.component";
import { TriangleWadElement } from "../../../wad/elements/models/triangle";

@Component({
    selector: "app-route-test",
    templateUrl: "./test-route.component.html",
    styleUrls: ["./test-route.component.css"],
    imports: [RenderViewComponent]
})
export class TestRouteComponent {
    private elements = inject(ElementsService);
    
    ngOnInit() {
        this.elements.add(new SquareWadElement(10, 10, 10));
        this.elements.add(new TriangleWadElement({ x: 30, y: 10 }, { x: 40, y: 10}, {x: 40, y: 20 }));
    }
}