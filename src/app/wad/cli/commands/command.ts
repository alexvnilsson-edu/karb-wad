import { Subject } from "rxjs";
import { WadCommandArgument } from "./command-argument";
import { WadCommandResult } from "./command-result";

export type WadCommandExecutor = (command: WadCommand) => boolean;

export class WadCommand {
    name!: string;
    alias!: Set<string>;
    arguments = new Set<WadCommandArgument<any>>();

    executor!: WadCommandExecutor;

    result!: WadCommandResult;

    private currentArgument = -1;

    constructor(name: string, alias: Set<string> = new Set()) {
        this.name = name;
        this.alias = alias;
    }

    addArgument<T>(name: string, prompt: string) {
        const arg = new WadCommandArgument<T>(name, prompt);
        this.arguments.add(arg);
    }

    prompt() {
        for (let i = 0; i < this.arguments.size; i++) {
            this.currentArgument = i;


        }
    }

    execute() {
        const result = this.executor(this);

        this.result = new WadCommandResult(result);
    }
}