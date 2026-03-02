import { Component, inject, signal } from "@angular/core";
import { ElementStorageService } from "../../../wad/elements/element-storage.service";
import { SquareWadModel } from "../../../wad/elements/square";
import { RenderViewComponent } from "../../rendering/render-view/render-view.component";
import { TriangleWadModel } from "../../../wad/elements/triangle";
import { createCoordinate } from "../../../wad/rendering/coordinate";

@Component({
    selector: "app-route-test",
    templateUrl: "./test-route.component.html",
    styleUrl: "./test-route.component.css",
    imports: [RenderViewComponent]
})
export class TestRouteComponent {
    private elementStorage = inject(ElementStorageService);

    elements = signal([
      new SquareWadModel(10, 10, 50),
      new TriangleWadModel(createCoordinate(60, 60), createCoordinate(110, 60), createCoordinate(110, 110))
    ]);
    
    ngOnInit() {
        this.elements().forEach(element => this.elementStorage.add(element));
    }
}