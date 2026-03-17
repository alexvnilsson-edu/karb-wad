import { Injectable, inject } from '@angular/core';
import { WadElementService } from 'app/wad/rendering/element.service';
import { WadCommand } from '../command';
import { WadCommandService } from '../command.service';
import { WadCommandLogService } from '../logs/command-log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'root' })
export class WadHelpCommandExecutor extends WadCommandExecutor {
  static ExecutorName = 'help';

  constructor() {
    super(WadHelpCommandExecutor.ExecutorName);
  }

  elementService = inject(WadElementService);
  commandService = inject(WadCommandService);
  logService = inject(WadCommandLogService);

  execute(_command: WadCommand) {
    const commands = Array.from(this.commandService.commands.keys()).filter(
      (c) => c.toLowerCase() !== 'help',
    );

    const message = $localize`Enter command into command prompt and press [Enter] to execute. Press [Escape] to minimise command window.

    Commands: ${commands.join(', ')}`;

    this.logService.info(message);

    return new WadCommandExecutorResult(true);
  }
}
