import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

// Elements
import { WadComponent } from "./components/wad.component";
import { ErrorWadComponent } from "./elements/components/error.component";
import { SquareWadComponent } from "./elements/components/square.component";
import { TriangleWadComponent } from "./elements/components/triangle.component";

// Services
import { ElementsService } from "./services/elements.service";
import { RenderingService } from "./services/rendering.service";

const ELEMENTS = [ 
    WadComponent,
    ErrorWadComponent,
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