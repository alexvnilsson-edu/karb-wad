/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
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

  log$ = computed(() => this.commandService.logs.log$());

  lastLogMessages$ = linkedSignal(() => this.log$().slice(-this.lookBack$()), {
    debugName: 'wadCommandLogLast',
  });
}
