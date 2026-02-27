import { Component, inject } from "@angular/core";
import { ElementsService } from "../../../wad/services/elements.service";

@Component({
    selector: "app-route-home",
    templateUrl: "./home-route.component.html"
})
export class HomeRouteComponent {
    private elements = inject(ElementsService);
    
    ngOnInit() {
        
    }
}