import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

// ---- COMPONENTS ----
import { WadElement } from "./rendering/element";

// -- ELEMENT COMPONENTS --
import { CircleleWadElement } from "./rendering/circle";
import { SquareWadElement } from "./rendering/square";
import { TriangleWadElement } from "./rendering/triangle";

// ---- SERVICES ----
import { ElementStorageService } from "./elements/element-storage.service";
import { RenderService } from "./rendering/render.service";

const ELEMENTS = [ 
    WadElement,
    CircleleWadElement,
    SquareWadElement,
    TriangleWadElement
];

@NgModule({
    declarations: [
        ELEMENTS
    ],
    providers: [
        ElementStorageService,
        RenderService
    ],
    exports: [ ELEMENTS ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class WadModule { }