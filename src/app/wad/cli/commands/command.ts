import { Subject } from "rxjs";
import { WadCommandArgument } from "./command-argument";
import { WadCommandResult } from "./command-result";
import { WadCommandExecutor } from "./command-executor.type";
import { WadCommandExecutorResult } from "./command-executor-result";

export class WadCommand {
    name!: string;
    alias!: Set<string>;
    arguments = new Map<string, WadCommandArgument<any>>();

    executor!: WadCommandExecutor;

    result!: WadCommandResult;

    constructor(name: string, alias: Set<string> = new Set()) {
        this.name = name;
        this.alias = alias;
    }

    registerArgument<T>(name: string, type: string, transformer: string) {
        const arg = new WadCommandArgument<T>(name, type, transformer);
        this.arguments.set(name, arg);
    }

    execute(): WadCommandExecutorResult {
        this.result = this.executor(this);
        return this.result;
    }
}
