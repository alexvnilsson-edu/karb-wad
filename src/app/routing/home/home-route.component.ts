import { Component, inject } from "@angular/core";
import { RenderViewComponent } from "../../rendering/render-view/render-view.component";
import { WadModule } from "app/wad/wad.module";
import { WadCommand } from "app/wad/cli/commands/command";
import { RectangleWadModel } from "app/wad/elements/rectangle";
import { ElementStorageService } from "app/wad/elements/element-storage.service";
import { WadCommandService } from "app/wad/cli/commands/command.service";
import { WadCoordinatesTransformer } from "app/wad/cli/commands/transformers/coordinates.transformer";
import { WadNumberTransformer } from "app/wad/cli/commands/transformers/number.transformer";

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
    private elementService = inject(ElementStorageService);
    private commandService = inject(WadCommandService);

    ngOnInit() {
        this.registerCommandTransformers();
        this.registerRectangleCommand();
    }

    private registerCommandTransformers() { 
        this.commandService.registerTransformer(
            "coordinates", 
            new WadCoordinatesTransformer()
        );
        this.commandService.registerTransformer(
            "number",
            new WadNumberTransformer()
        );
    }

  private registerRectangleCommand() {
    const command = new WadCommand("rectangle", new Set("rect"));
    command.addArgument("origin", "coordinates");
    command.addArgument("width", "number");
    command.addArgument("height", "number");
    command.executor = (command) => {
      const origin = command.arguments.get("origin");
      const [x, y] = origin!.value;
      const width = command.arguments.get("width")?.value;
      const height = command.arguments.get("height")?.value;
      const element = new RectangleWadModel(x, y, width, height);
      this.elementService.add(element);
      return true;
    }
    this.commandService.registerCommand(command);
  }
}