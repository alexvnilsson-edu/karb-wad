import { WadCommandResult } from "./command-result";

export type WadCommandExecutor = (command: WadCommand) => boolean;

export class WadCommand {
    name!: string;
    alias: Set<string> = new Set<string>();

    executor!: WadCommandExecutor;

    result!: WadCommandResult;

    constructor(name: string) {
        this.name = name;
    }

    execute() {
        const result = this.executor(this);

        this.result = new WadCommandResult(result);
    }
}