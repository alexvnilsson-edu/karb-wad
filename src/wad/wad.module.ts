import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { WadElement } from "./rendering/element";

import { CircleleWadElement } from "./rendering/circle";
import { RectangleWadElement } from "./rendering/rectangle";
import { TriangleWadElement } from "./rendering/triangle";

import { CommandInput } from "./cli/command-input/command-input";

import { ElementStorageService } from "./elements/element-storage.service";
import { RenderService } from "./rendering/render.service";

const ELEMENTS = [ 
    WadElement,
    CircleleWadElement,
    RectangleWadElement,
    TriangleWadElement
];

@NgModule({
    declarations: [
        CommandInput,
        ELEMENTS
    ],
    providers: [
        ElementStorageService,
        RenderService
    ],
    exports: [ CommandInput, ELEMENTS ]
})
export class WadModule { }