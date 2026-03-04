import { Subject } from "rxjs";
import { WadCommandArgument } from "./command-argument";
import { WadCommandResult } from "./command-result";

export type WadCommandExecutor = (command: WadCommand) => boolean;

export class WadCommand {
    name!: string;
    alias!: Set<string>;
    arguments = new Array<WadCommandArgument<any>>();

    executor!: WadCommandExecutor;

    result!: WadCommandResult;

    constructor(name: string, alias: Set<string> = new Set()) {
        this.name = name;
        this.alias = alias;
    }

    addArgument<T>(name: string, transformer: string) {
        const arg = new WadCommandArgument<T>(name, transformer);
        this.arguments.push(arg);
    }

    execute() {
        const result = this.executor(this);

        this.result = new WadCommandResult(result);
    }
}