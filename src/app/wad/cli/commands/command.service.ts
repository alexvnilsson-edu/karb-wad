import { Injectable, signal, WritableSignal } from '@angular/core';
import { WadCommand } from './command';

@Injectable({
  providedIn: 'root'
})
export class WadCommandService {
  private commands = new Map<string, WadCommand>();

  isPrompting$ = signal(false);
  currentCommand$ = signal<WadCommand | undefined>(undefined);

  constructor() { 

  }

  register(name: string, args: any[]) {
    const command = new WadCommand(name);
    this.commands.set(name, command);
  }

  registerCommand(command: WadCommand) {
    this.commands.set(command.name, command);
  }
  
  initiate(name: string) {

  }

  find(query: string): WadCommand | undefined {
    if (this.commands.has(query)) {
      return this.commands.get(query);
    }

    for (const command of this.commands.values()) {
      if (command.alias.has(query)) {
        return command;
      }
    }

    return undefined;
  }

  interpret(input: string) {
    const args = input.split(" ");
    if (args.length === 0) {
      throw new Error(`Invalid command argument length: 0`);
    }
    const commandName = args[0];
    const command = this.find(commandName);
    if (command === undefined) {
      throw new Error(`Command not found: ${commandName}`);
    }
  }

  execute(name: string) {
    if (!this.commands.has(name)) {
      throw new Error(`Command not found: ${name}`);
    }

    const command = this.commands.get(name);

    if (command === undefined) {
      throw new Error(`Command is undefined.`);
    }

    command!.execute();
  }

}
