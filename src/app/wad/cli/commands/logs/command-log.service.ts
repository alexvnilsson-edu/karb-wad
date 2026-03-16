import { Injectable, signal } from '@angular/core';
import { WadCommandLogMessage } from './command-log-message';
import { WadCommandLogMessageLevel } from './command-log-message-levels';

@Injectable({
  providedIn: 'root',
})
export class WadCommandLogService {
  private _log = signal<WadCommandLogMessage[]>([]);

  readonly log$ = this._log.asReadonly();

  debug(message: string) {
    this.add(message, WadCommandLogMessageLevel.DEBUG);
  }

  info(message: string) {
    this.add(message, WadCommandLogMessageLevel.INFO);
  }

  warning(message: string) {
    this.add(message, WadCommandLogMessageLevel.WARNING);
  }

  error(message: string) {
    this.add(message, WadCommandLogMessageLevel.ERROR);
  }

  private add(message: string, level: WadCommandLogMessageLevel = WadCommandLogMessageLevel.INFO) {
    this._log.update((log) => {
      log.push(new WadCommandLogMessage(message, level));
      return log;
    });
  }
}
