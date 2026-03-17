import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { WadCommandLogMessage } from '../commands/logs/command-log-message';
import { WadCommandLogMessageLevel } from '../commands/logs/command-log-message-levels';
import { WadCommandLogService } from '../commands/logs/command-log.service';

@Component({
  selector: 'app-wad-command-log',
  templateUrl: './command-log.html',
  styleUrl: './command-log.scss',
  imports: [NgClass],
})
export class WadCommandLog {
  logService = inject(WadCommandLogService);

  lookBack = signal(10);

  messages = computed(() => this.logService.log$());

  getMessageLevelClass(message: WadCommandLogMessage) {
    return {
      debug: message.level === WadCommandLogMessageLevel.DEBUG,
      info: message.level === WadCommandLogMessageLevel.INFO,
      warning: message.level === WadCommandLogMessageLevel.WARNING,
      error: message.level === WadCommandLogMessageLevel.ERROR,
    };
  }
}
