/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, computed, input } from '@angular/core';
import { WadCommandLogMessage } from '../commands/logs/log-message';
import { WadCommandLogMessageLevel } from '../commands/logs/log-message-levels';

@Component({
  selector: 'app-wad-command-log-message',
  template: `{{ time$() }}&nbsp;&nbsp;{{ message$() }}`,
  styles: `
    :host {
      flex: 1;

      font-family: var(--font-mono);
      font-size: 0.85rem;

      small {
        font-size: 0.75rem;
      }

      &.debug {
        color: var(--color-gray-200);
      }
      &.info {
        color: var(--color-gray-100);
      }
      &.warning {
        color: rgb(239, 255, 171);
      }
      &.error {
        color: var(--mat-sys-error);
      }
    }
  `,
  host: {
    '[class]': 'levelClasses$()',
  },
  standalone: false,
})
export class WadCommandLogMessageComponent {
  message = input.required<WadCommandLogMessage>();

  time$ = computed(() => {
    const t = this.message().time;
    return new Intl.DateTimeFormat('sv-SE', { timeStyle: 'medium' }).format(t);
  });
  message$ = computed(() => this.message().message);
  level$ = computed(() => this.message().level);

  levelClasses$ = computed(() => ({
    debug: this.level$() === WadCommandLogMessageLevel.DEBUG,
    info: this.level$() === WadCommandLogMessageLevel.INFO,
    warning: this.level$() === WadCommandLogMessageLevel.WARNING,
    error: this.level$() === WadCommandLogMessageLevel.ERROR,
  }));
}
