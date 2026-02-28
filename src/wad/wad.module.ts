import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

// ---- COMPONENTS ----
import { WadComponent } from "./components/wad.component";

// -- ELEMENT COMPONENTS --
import { SquareWadComponent } from "./components/elements/square.component";
import { TriangleWadComponent } from "./components/elements/triangle.component";

// ---- SERVICES ----
import { ElementsService } from "./services/elements.service";
import { RenderingService } from "./services/rendering.service";

const ELEMENTS = [ 
    WadComponent,
    SquareWadComponent,
    TriangleWadComponent
];

@NgModule({
    declarations: [
        ELEMENTS
    ],
    providers: [
        ElementsService,
        RenderingService
    ],
    exports: [ ELEMENTS ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class WadModule { }