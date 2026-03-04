import { Component } from "@angular/core";
import { RenderViewComponent } from "../../rendering/render-view/render-view.component";
import { WadModule } from "app/wad/wad.module";

@Component({
    selector: "app-route-home",
    templateUrl: "./home-route.component.html",
    styleUrl: "./home-route.component.css",
    host: {
        "class": "flex flex-col flex-1 items-stretch"
    },
    imports: [WadModule, RenderViewComponent]
})
export class HomeRouteComponent {
    
}