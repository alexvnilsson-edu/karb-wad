import { signal } from "@angular/core";
import { WadCommandService } from "./command.service";
import { WadCommand } from "./command";

describe("CommandService", () => {
    let service: WadCommandService;

    beforeEach(() => {
        service = new WadCommandService();
    });

    it("executor should increment variable", () => {
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
});