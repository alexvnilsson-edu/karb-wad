import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

// Elements
import { SquareWadComponent } from "./elements/components/square.component";
import { BaseWadComponent } from "./elements/components/base.component";
import { ErrorWadComponent } from "./elements/components/error.component";

const ELEMENTS = [ 
    BaseWadComponent,
    ErrorWadComponent,
    SquareWadComponent
];

@NgModule({
    declarations: [
        ELEMENTS
    ],
    exports: [ ELEMENTS ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class WadModule { }