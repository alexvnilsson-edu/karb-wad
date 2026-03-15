/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { WadCommandService } from '../commands/command.service';

@Component({
  selector: 'wad-command-log',
  standalone: false,
  templateUrl: './command-log.html',
  styleUrl: './command-log.scss',
})
export class WadCommandLog {
  commandService = inject(WadCommandService);

  lookBack$ = signal(10);

  log$ = linkedSignal(() => this.commandService.logs.log$().slice(-this.lookBack$()).entries());
}
