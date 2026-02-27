import { Component, HostBinding, input, NO_ERRORS_SCHEMA } from "@angular/core";
import { SquareWadElement } from "../models/square";
import { BaseWadComponent } from "./base.component";

@Component({
    selector: "[wad-square]",
    template: `<rect></rect>`,
    standalone: false
})
export class SquareWadComponent extends BaseWadComponent<SquareWadElement> {
    @HostBinding("attr.x")
    x: number = this.element().coordinate().x;

    @HostBinding("attr.y")
    y: number = this.element().coordinate().y;
}