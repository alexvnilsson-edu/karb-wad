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
        this.registerLineCommand();
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

                return new WadCommandExecutorResult(true, `Circle #${element.id} was created.`);
            } catch (ex) {
                return new WadCommandExecutorResult(false, `Error creating circle: ${ex}`);
            }
        };
        this.commandService.registerCommand(command);
    }

    private registerLineCommand() {
        const command = new WadCommand("line", new Set(["l", "li", "linje"]));
        command.addArgument("start", "coordinates");
        command.addArgument("end", "coordinates");
        command.executor = (command) => {
            try {
                const [startX, startY] = command.arguments.get("start")?.value;
                const [endX, endY] = command.arguments.get("end")?.value;
                const element = new LineWadModel(startX, startY, endX, endY);
                this.elementService.add(element);

                return new WadCommandExecutorResult(true, `Line #${element.id} was created.`);
            } catch (ex) {
                return new WadCommandExecutorResult(false, `Error creating line: ${ex}`);
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

                return new WadCommandExecutorResult(true, `Rectangle #${element.id} was created.`);
            } catch (ex) {
                return new WadCommandExecutorResult(false, `Error creating rectangle: ${ex}`);
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
                const element = new TriangleWadModel(a, b, c);
                this.elementService.add(element);

                return new WadCommandExecutorResult(true, `Triangle #${element.id} was created.`);
            } catch (ex) {
                return new WadCommandExecutorResult(false, `Error creating triangle: ${ex}`);
            }
        };
        this.commandService.registerCommand(command);
    }
}