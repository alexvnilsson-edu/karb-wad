import { Component } from "@angular/core";
import { RenderViewComponent } from "../../render-view/render-view.component";

@Component({
    selector: "app-route-home",
    templateUrl: "./home-route.component.html",
    styleUrl: "./home-route.component.css",
    host: {
        "class": "flex flex-col flex-1 items-stretch"
    },
    imports: [RenderViewComponent]
})
export class HomeRouteComponent {
    
}