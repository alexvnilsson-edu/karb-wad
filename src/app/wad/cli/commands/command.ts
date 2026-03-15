import { ArgumentType } from './argument-types/argument-type';
import { WadCommandArgument } from './command-argument';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';
import { WadCommandResult } from './command-result';

export class WadCommand {
  name!: string;
  alias!: Set<string>;
  arguments = new Map<string, WadCommandArgument<any>>();

  executor!: WadCommandExecutor;

  result!: WadCommandResult;

  constructor(name: string, alias = new Set<string>()) {
    this.name = name;
    this.alias = alias;
  }

  registerArgument<T>(name: string, description: string, type: ArgumentType<T>) {
    const arg = new WadCommandArgument<T>(name, description, type);
    this.arguments.set(name, arg);
  }

  execute(): WadCommandExecutorResult {
    this.result = this.executor(this);
    return this.result;
  }
}
