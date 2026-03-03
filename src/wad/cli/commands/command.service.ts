import { Injectable, signal, WritableSignal } from '@angular/core';
import { WadCommand } from './command';

@Injectable({
  providedIn: 'root'
})
export class WadCommandService {
  private commands = new Map<string, WadCommand>();

  constructor() { 

  }

  register(name: string, args: any[]) {
    const command = new WadCommand(name);
    this.commands.set(name, command);
  }

  registerCommand(command: WadCommand) {
    this.commands.set(command.name, command);
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
