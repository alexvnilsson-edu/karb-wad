import { Component, inject } from "@angular/core";
import { ElementsService } from "../../services/elements.service";
import { SquareWadElement } from "../../models/elements/square";

@Component({
    selector: "app-route-home",
    templateUrl: "./home-route.component.html"
})
export class HomeRouteComponent {
    private elements = inject(ElementsService);
    
    ngOnInit() {
        
    }
}