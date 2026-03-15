import { inject, Injectable, signal } from '@angular/core';
import { WadElementService } from 'app/wad/rendering/element.service';
import { Subject } from 'rxjs';
import { CanvasClickEvent } from '../../rendering/canvas-click.event';
import { WadArgumentTransformer } from '../transformers/transformer';
import { WadArgumentType } from './argument-types/argument-type';
import { WadCommand } from './command';
import { WadCommandArgument } from './command-argument';
import { configureCommands, wadCommandTypes } from './command-config';

@Injectable({
  providedIn: 'root',
})
export class WadCommandService {
  private _types = new Map<string, WadArgumentType<unknown>>();
  private _commands = new Map<string, WadCommand>();
  private _transformers = new Map<string, WadArgumentTransformer<unknown>>();

  private _log = signal<string[]>([]);

  protected elementService = inject(WadElementService);

  readonly commands = this._commands;
  readonly transformers = this._transformers;

  readonly log = this._log.asReadonly();

  canvasClick = new Subject<CanvasClickEvent>();

  constructor() {
    configureCommands(this, this.elementService);
  }

  register(name: string, alias: string[], args: WadCommandArgument<unknown>[]) {
    const command = new WadCommand(name, new Set(alias));
    for (const arg of args) {
      command.arguments.set(arg.name, arg);
    }

    this._commands.set(name, command);
  }

  registerCommand(command: WadCommand) {
    this._commands.set(command.name, command);
  }

  registerTransformer<T>(type: string, transformer: WadArgumentTransformer<T>) {
    this._transformers.set(type, transformer);
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
    const args = input.split(' ');
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
      const argSyntax = Array.from(command.arguments.values())
        .map((a) => {
          const [name, description, typeDescription, typeExample] = [
            a.name,
            a.description,
            a.type.description,
            a.type.example,
          ];
          return `${name} <${description}: ${typeDescription} (${typeExample}]>`;
        })
        .join(' ');
      throw new Error(`Syntax error. Expected: ${commandName} ${argSyntax}`);
    }
    for (let argIndex = 0; argIndex < argsPostName.length; argIndex++) {
      const input = argsPostName[argIndex];
      const arg = commandArgs[argIndex];
      arg.value = input;
    }
    return command;
  }

  execute(name: string) {
    if (!this._commands.has(name)) {
      throw new Error(`Command not found: ${name}`);
    }

    const command = this._commands.get(name);

    if (!command) {
      throw new Error(`Command is undefined.`);
    }

    command!.execute();
  }

  writeLog(message: string) {
    this._log.update((log) => {
      log.push(message);
      return log;
    });
  }

  getType(name: string) {
    if (!this._types.has(name)) {
      throw new Error(`Command type not found: ${name}`);
    }

    return this._types.get(name);
  }

  private _registerTypes() {
    for (const [name, type] of wadCommandTypes) {
      if (this._types.has(name)) {
        throw new Error(`Command type already registered: ${name}.`);
      }
      this._types.set(name, type);
    }
  }
}
