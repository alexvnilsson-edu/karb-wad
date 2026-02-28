import { Component, inject } from "@angular/core";
import { ElementsService } from "../../../wad/services/elements.service";
import { RenderViewComponent } from "../../components/render-view/render-view.component";

@Component({
    selector: "app-route-home",
    templateUrl: "./home-route.component.html",
    imports: [RenderViewComponent]
})
export class HomeRouteComponent {
    private elements = inject(ElementsService);
    
    ngOnInit() {
        
    }
}