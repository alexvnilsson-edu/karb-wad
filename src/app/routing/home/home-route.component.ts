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

        // Register commands.
        this.registerCircleCommand();
        this.registerRectangleCommand();
        this.registerTriangleCommand();
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

    private registerCircleCommand() {
        const command = new WadCommand("circle", new Set(["circ", "circel", "cirkel"]));
        command.addArgument("origin", "coordinates");
        command.addArgument("radius", "number");
        command.executor = (command) => {
            try {
                const origin = command.arguments.get("origin");
                const [x, y] = origin!.value;
                const radius = command.arguments.get("radius")?.value;
                const element = new CircleWadModel(x, y, radius);
                this.elementService.add(element);
                return true;
            } catch (ex) {
                console.error(ex);
                return false;
            }
        };
        this.commandService.registerCommand(command);
    }

    private registerRectangleCommand() {
        const command = new WadCommand("rectangle", new Set(["rect", "rectangel", "rektangel"]));
        command.addArgument("origin", "coordinates");
        command.addArgument("width", "number");
        command.addArgument("height", "number");
        command.executor = (command) => {
            try {
                const origin = command.arguments.get("origin");
                const [x, y] = origin!.value;
                const width = command.arguments.get("width")?.value;
                const height = command.arguments.get("height")?.value;
                const element = new RectangleWadModel(x, y, width, height);
                this.elementService.add(element);
                return true;
            } catch (ex) {
                console.error(ex);
                return false;
            }
        }
        this.commandService.registerCommand(command);
    }


    private registerTriangleCommand() {
        const command = new WadCommand("triangle", new Set(["tri", "triangel", "trekant"]));
        command.addArgument("a", "coordinates");
        command.addArgument("b", "coordinates");
        command.addArgument("c", "coordinates");
        command.executor = (command) => {
            try {
                const a = command.arguments.get("a")?.value;
                const b = command.arguments.get("b")?.value;
                const c = command.arguments.get("c")?.value;
                this.elementService.add(new TriangleWadModel(a, b, c));

                return true;
            } catch (ex) {
                console.error(ex);
                return false;
            }
        };
        this.commandService.registerCommand(command);
    }
}