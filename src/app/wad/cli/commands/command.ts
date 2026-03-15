import { WadCommandArgument } from './arguments/command-argument';
import { WadCommandArgumentType } from './arguments/types/argument-type';
import { WadCommandExecutor } from './executors/command-executor.type';
import { WadCommandResult } from './results/command-result';

export class WadCommand {
  name!: string;
  aliases = new Set<string>();
  arguments = new Map<string, WadCommandArgument<unknown>>();

  executor!: WadCommandExecutor;

  result!: WadCommandResult;

  constructor(
    name: string,
    executor: WadCommandExecutor | undefined = undefined,
    aliases: string[] = [],
    args: WadCommandArgument<unknown>[] = [],
  ) {
    this.name = name;
    if (executor) {
      this.executor = executor;
    }
    aliases.forEach((alias) => this.aliases.add(alias));
    args.forEach((arg) => this.arguments.set(arg.name, arg));
  }

  registerExecutor(executor: WadCommandExecutor) {
    this.executor = executor;
  }

  registerArgument<T>(name: string, description: string, type: WadCommandArgumentType<T>) {
    const arg = new WadCommandArgument<T>(name, description, type);
    this.arguments.set(name, arg);
  }
}
