import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

// Elements
import { SquareWadComponent } from "./elements/components/square.component";
import { WadComponent } from "./components/wad.component";
import { ErrorWadComponent } from "./elements/components/error.component";

// Services
import { ElementsService } from "./services/elements.service";
import { RenderingService } from "./services/rendering.service";

const ELEMENTS = [ 
    WadComponent,
    ErrorWadComponent,
    SquareWadComponent
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