import { Component, inject, linkedSignal, signal } from '@angular/core';
import { WadCommandService } from '../commands/command.service';

@Component({
  selector: 'app-command-log',
  imports: [],
  templateUrl: './command-log.html',
  styleUrl: './command-log.css',
})
export class CommandLog {
  commandService = inject(WadCommandService);

  lookBack$ = signal(10);

  log$ = linkedSignal(() => this.commandService.log().slice(-this.lookBack$()).entries());
}
