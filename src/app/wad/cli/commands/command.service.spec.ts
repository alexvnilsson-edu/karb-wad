import { signal } from "@angular/core";
import { WadCommandService } from "./command.service";
import { WadCommand } from "./command";
import { WadCoordinatesTransformer } from "./transformers/coordinates.transformer";
import { createCoordinate } from "../../rendering/coordinate";

describe("CommandService", () => {
    let service: WadCommandService;

    beforeEach(() => {
        service = new WadCommandService();
        service.registerTransformer("coordinates", new WadCoordinatesTransformer());
    });

    it("should increment variable by executor", () => {
        const name = "test";
        const command = new WadCommand(name);
        let x = 1;
        command.executor = (command) => {
            x++;
            return true;
        }
        service.registerCommand(command);
        service.execute(name);

        expect(x).toBe(2);
    });

    it("should find command by name", () => {
        const name = "test";
        const command = new WadCommand(name, new Set(["t"]));
        service.registerCommand(command);
        const found = service.find(name);
        expect(found).not.toBeUndefined();
        assert(found!.name === name);
    });

    it("should find command by alias", () => {
        const name = "rectangle";
        const alias = "rect";
        const command = new WadCommand(name, new Set([alias]));
        service.registerCommand(command);
        const found = service.find(alias);
        expect(found).not.toBeUndefined();
        assert(found!.name === name);
        expect(service.find(alias + "2")).toBeUndefined();
    });

    it("should interpret string to command", () => {
        const input = "test 25..50";
        const command = new WadCommand("test", new Set(["t"]));
        command.registerArgument("origin", "coordinates");
        service.registerCommand(command);
        const found = service.interpret(input);
        expect(found).not.toBeUndefined();
        expect(found.name).toBe("test");
        expect(found.arguments.get("origin")).not.toBeUndefined();
        expect(found.arguments.get("origin")!.value).toStrictEqual(createCoordinate(25, 50));
    });

    it("should have Coordinate transformer", () => {
        expect(service.transformers.keys()).toContain("coordinates");
    })
});
