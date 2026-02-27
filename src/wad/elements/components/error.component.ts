import { Component } from "@angular/core";
import { BaseWadComponent } from "./base.component";
import { WadElement } from "../models/element";

@Component({
    selector: "wad-error",
    template: `<text x="10" y="10"><strong>Error:</strong> Element #{{ element()?.id || "unknown" }} with type <q>{{ element()?.type || "unknown" }}</q></text>`,
    standalone: false
})
export class ErrorWadComponent extends BaseWadComponent<WadElement> { }