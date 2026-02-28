import { Component, computed, HostBinding, input, NO_ERRORS_SCHEMA } from "@angular/core";
import { SquareWadElement } from "../models/square";
import { WadComponent } from "../../components/wad.component";
import { WadModule } from "../../wad.module";

@Component({
    selector: `[wad-square]`,
    template: ``,
    host: {
        "[attr.x]": "x()",
        "[attr.y]": "y()"
    },
    standalone: false
})
export class SquareWadComponent extends WadComponent<SquareWadElement> {
    x = computed(() => this.getElement()?.coordinate().x || 0);

    y = computed(() => this.getElement()?.coordinate().y || 0);

    constructor() {
        super();
        console.debug(`[${SquareWadComponent.name}] Constructed`);
    }

    ngOnInit() {
        console.debug(`[${SquareWadComponent.name}] Init`);
    }
}