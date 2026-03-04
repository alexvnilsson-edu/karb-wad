import { Injectable, signal, WritableSignal } from '@angular/core';
import { WadCommand } from './command';
import { WadCommandTransformer } from './transformers/transformer';
import { WadCommandArgument } from './command-argument';
import { stringify } from 'node:querystring';

@Injectable({
  providedIn: 'root'
})
export class WadCommandService {
  private _commands = new Map<string, WadCommand>();
  private _transformers = new Map<string, WadCommandTransformer<any>>();

  readonly commands = this._commands;
  readonly transformers = this._transformers;

  isPrompting$ = signal(false);
  currentCommand$ = signal<WadCommand | undefined>(undefined);

  constructor() { 

  }

  register(name: string, args: any[]) {
    const command = new WadCommand(name);
    this._commands.set(name, command);
  }

  registerCommand(command: WadCommand) {
    this._commands.set(command.name, command);
  }

  registerTransformer<T>(type: string, transformer: Object) {
    this._transformers.set(type, transformer as WadCommandTransformer<T>);
  }

  transformArgument<T>(arg: WadCommandArgument<T>, input: string) {
    const type = arg.transformer;

    if (!type) {
      return arg.value;
    }

    if (!this._transformers.has(type)) {
      throw new Error(`Transformer not found: ${type}`);
    }

    const transformer = this._transformers.get(type);

    if (!transformer) {
      throw new Error(`Unable to instantiate transformer: ${type}`);
    }

    const output = transformer!.to(input);

    return output;
  }
  
  initiate(name: string) {

  }

  find(query: string): WadCommand | undefined {
    if (this._commands.has(query)) {
      return this._commands.get(query);
    }

    for (const command of this._commands.values()) {
      if (command.alias.has(query)) {
        return command;
      }
    }

    return undefined;
  }

  interpret(input: string): WadCommand {
    const args = input.split(" ");
    if (args.length === 0) {
      throw new Error(`Invalid command argument length: 0`);
    }
    const commandName = args[0];
    const command = this.find(commandName);
    if (command === undefined) {
      throw new Error(`Command not found: ${commandName}`);
    }
    const argsPostName = args.slice(1);
    const commandArgNames = Array.from(command.arguments.keys());
    const commandArgs = Array.from(command.arguments.values());
    if (argsPostName.length !== command.arguments.size) {
      throw new Error(`Argument length mismatch: ${JSON.stringify(Array.from(command.arguments.values()))}, ${JSON.stringify(argsPostName)}`);
    }
    for (let argIndex = 0; argIndex < argsPostName.length; argIndex++) {
      const input = argsPostName[argIndex];
      const arg = commandArgs[argIndex];
      if (arg.transformer) {
        const value = this.transformArgument<any>(arg, input);
        arg.value = value;
      } else {
        arg.value = input;
      }
    }
    return command;
  }

  execute(name: string) {
    if (!this._commands.has(name)) {
      throw new Error(`Command not found: ${name}`);
    }

    const command = this._commands.get(name);

    if (command === undefined) {
      throw new Error(`Command is undefined.`);
    }

    command!.execute();
  }

}
