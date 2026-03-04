import { signal } from "@angular/core";
import { WadCommandService } from "./command.service";
import { WadCommand } from "./command";

describe("CommandService", () => {
    let service: WadCommandService;

    beforeEach(() => {
        service = new WadCommandService();
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
        const name = "test";
        const alias = "t";
        const command = new WadCommand(name, new Set([alias]));
        service.registerCommand(command);
        const found = service.find(alias);
        expect(found).not.toBeUndefined();
        assert(found!.name === name);
    });

    it("should not find command by wrong alias", () => {
        const name = "test";
        const alias = "t";
        const command = new WadCommand(name, new Set([alias]));
        service.registerCommand(command);
        const found = service.find(alias + "2");
        expect(found).toBeUndefined();
    });

    it("should interpret string to command", () => {
        const input = "test foo";
        const command = new WadCommand("test", new Set(["t"]));
        command.addArgument("foo", "Foo");
        service.registerCommand(command);
        const found = service.interpret("test bar");
        expect(found).not.toBeUndefined();
        expect(found.name).toBe("test");
    });
});