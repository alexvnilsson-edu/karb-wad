import { inject, Injectable } from '@angular/core';
import { WadElementService } from 'app/wad/rendering/element.service';
import { Subject } from 'rxjs';
import { CanvasClickEvent } from '../../rendering/canvas-click.event';
import { WadCommandArgumentTransformer } from './arguments/transformers/transformer';
import { WadCommandArgumentType } from './arguments/types/argument-type';
import { WadCommand } from './command';
import { WadCommandExecutorResult } from './executors/command-executor-result';
import { WadCommandLogService } from './logs/command-log.service';

type WadCommandServiceRegistrationType =
  | WadCommand
  | WadCommandArgumentTransformer<unknown>
  | WadCommandArgumentType<unknown>;
type WadCommandServiceRegistrationTypes = 'command' | 'transformer' | 'type';

@Injectable({
  providedIn: 'root',
})
export class WadCommandService {
  private _types = new Map<string, WadCommandArgumentType<unknown>>();
  private _commands = new Map<string, WadCommand>();
  private _transformers = new Map<string, WadCommandArgumentTransformer<unknown>>();

  protected elementService = inject(WadElementService);

  logs = inject(WadCommandLogService);

  readonly commands = this._commands;
  readonly transformers = this._transformers;

  canvasClick = new Subject<CanvasClickEvent>();

  register(
    type: WadCommandServiceRegistrationTypes = 'command',
    obj: WadCommandServiceRegistrationType,
  ) {
    switch (type) {
      case 'command':
        this._commands.set((obj as WadCommand).name, obj as WadCommand);
        break;
      case 'transformer':
        this._transformers.set(
          (obj as WadCommandArgumentTransformer<unknown>).name,
          obj as WadCommandArgumentTransformer<unknown>,
        );
        break;
      case 'type':
        this._types.set(
          (obj as WadCommandArgumentType<unknown>).name,
          obj as WadCommandArgumentType<unknown>,
        );
        break;
      default:
        throw new Error(`Type cannot be registered as a command part: ${type}`);
    }
  }

  registerTransformer<T>(type: string, transformer: WadCommandArgumentTransformer<T>) {
    this._transformers.set(type, transformer);
  }

  find(query: string): WadCommand | undefined {
    if (this._commands.has(query)) {
      return this._commands.get(query);
    }

    for (const command of this._commands.values()) {
      if (command.aliases.has(query)) {
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
      this.logs.error(`Unexpected syntax. ${commandName} ${argSyntax}`);
      throw new Error(`Syntax error. Expected: ${commandName} ${argSyntax}`);
    }
    for (let argIndex = 0; argIndex < argsPostName.length; argIndex++) {
      const input = argsPostName[argIndex];
      const arg = commandArgs[argIndex];
      arg.value = input;
    }
    return command;
  }

  execute(command: WadCommand): WadCommandExecutorResult {
    if (!command) {
      throw new Error(`Command is undefined.`);
    }

    return command!.executor!.execute(command!);
  }

  executeByName(name: string): WadCommandExecutorResult {
    if (!this._commands.has(name)) {
      throw new Error(`Command not found: ${name}`);
    }

    const command = this._commands.get(name);

    if (!command) {
      throw new Error(`Error is undefined.`);
    }

    return this.execute(command);
  }

  getType(name: string) {
    if (!this._types.has(name)) {
      throw new Error(`Command type not found: ${name}`);
    }

    return this._types.get(name);
  }

  // private _registerTypes() {
  //   for (const [name, type] of wadCommandTypes) {
  //     if (this._types.has(name)) {
  //       throw new Error(`Command type already registered: ${name}.`);
  //     }
  //     this._types.set(name, type);
  //   }
  // }
}
