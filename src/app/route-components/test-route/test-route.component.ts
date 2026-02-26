import { Component, inject } from "@angular/core";
import { ElementsService } from "../../services/elements.service";
import { SquareWadElement } from "../../models/wad-elements/square";
import { RenderViewComponent } from "../../components/render-view/render-view.component";

@Component({
    selector: "app-route-test",
    templateUrl: "./test-route.component.html",
    imports: [RenderViewComponent]
})
export class TestRouteComponent {
    private elements = inject(ElementsService);
    
    ngOnInit() {
        console.log("test init");
        this.elements.add(new SquareWadElement(10, 10, 10));
    }
}