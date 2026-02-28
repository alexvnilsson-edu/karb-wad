import { Component } from "@angular/core";
import { WadComponent } from "../../components/wad.component";
import { WadElement } from "../models/element";

@Component({
    selector: "wad-error",
    template: `<text x="10" y="10"><strong>Error:</strong> Element #{{ element()?.id || "unknown" }} with type <q>{{ element()?.type || "unknown" }}</q></text>`,
    standalone: false
})
export class ErrorWadComponent extends WadComponent<WadElement> { }