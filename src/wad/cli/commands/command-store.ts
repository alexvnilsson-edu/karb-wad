import { Injectable, signal, WritableSignal } from '@angular/core';
import { WadCommand } from './command';

@Injectable({
  providedIn: 'root'
})
export class CommandStore {
  private commands: WritableSignal<Set<WadCommand>> = signal(new Set());

  constructor() { 

  }

  registerCommand(name: string, args: any[]) {
    
  }

}
