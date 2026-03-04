import { Component, inject } from "@angular/core";
import { RenderViewComponent } from "../../rendering/render-view/render-view.component";
import { WadModule } from "app/wad/wad.module";
import { WadCommand } from "app/wad/cli/commands/command";
import { RectangleWadModel } from "app/wad/elements/rectangle";
import { ElementStorageService } from "app/wad/elements/element-storage.service";
import { WadCommandService } from "app/wad/cli/commands/command.service";
import { WadCoordinatesTransformer } from "app/wad/cli/commands/transformers/coordinates.transformer";
import { WadNumberTransformer } from "app/wad/cli/commands/transformers/number.transformer";
import { TriangleWadModel } from "app/wad/elements/triangle";
import { CircleWadModel } from "app/wad/elements/circle";
import { LineWadModel } from "app/wad/elements/line";
import { WadCommandExecutorResult } from "app/wad/cli/commands/command-executor-result";

import {configureCommands} from "../../wad/cli/commands/command-config";

@Component({
    selector: "app-route-home",
    templateUrl: "./home-route.component.html",
    styleUrl: "./home-route.component.css",
    host: {
        "class": "flex flex-col flex-1 items-stretch"
    },
    imports: [WadModule, RenderViewComponent]
})
export class HomeRouteComponent {
  private commandService = inject(WadCommandService);
  private elementService = inject(ElementStorageService);

  ngOnInit() {
    configureCommands(this.commandService, this.elementService);
  }
}
