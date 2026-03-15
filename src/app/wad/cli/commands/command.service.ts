import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { CanvasClickEvent } from '../../rendering/canvas-click.event';
import { Transformer } from '../transformers/transformer';
import { WadCommand } from './command';

@Injectable({
  providedIn: 'root',
})
export class WadCommandService {
  private _commands = new Map<string, WadCommand>();
  private _transformers = new Map<string, Transformer<unknown>>();

  private _log = signal<string[]>([]);

  readonly commands = this._commands;
  readonly transformers = this._transformers;

  readonly log = this._log.asReadonly();

  canvasClick = new Subject<CanvasClickEvent>();

  register(name: string, args: unknown[]) {
    const command = new WadCommand(name);
    this._commands.set(name, command);
  }

  registerCommand(command: WadCommand) {
    this._commands.set(command.name, command);
  }

  registerTransformer<T>(type: string, transformer: Transformer<T>) {
    this._transformers.set(type, transformer);
  }

  initiate(name: string) {}

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
}
