/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, inject, signal } from '@angular/core';
import { WadCommandLogService } from '../commands/logs/log.service';

@Component({
  selector: 'wad-command-log',
  standalone: false,
  templateUrl: './command-log.html',
  styleUrl: './command-log.scss',
})
export class WadCommandLog {
  logService = inject(WadCommandLogService);

  lookBack$ = signal(10);
  lastLogMessages$ = computed(
    () =>
      this.logService.log$().length < this.lookBack$()
        ? this.logService.log$()
        : this.logService.log$().slice(this.lookBack$(), 10),
    {
      debugName: 'wadCommandLogLast',
    },
  );
}
