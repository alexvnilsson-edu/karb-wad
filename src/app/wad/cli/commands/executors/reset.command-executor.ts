import { Injectable, inject } from '@angular/core';
import { WadElementService } from 'app/wad/rendering/element.service';
import { WadCommand } from '../command';
import { WadCommandLogService } from '../logs/command-log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'root' })
export class WadResetCommandExecutor extends WadCommandExecutor {
  static ExecutorName = 'reset';

  constructor() {
    super(WadResetCommandExecutor.ExecutorName);
  }

  elementService = inject(WadElementService);
  logService = inject(WadCommandLogService);

  execute(_command: WadCommand) {
    const elementSize = this.elementService.elements().size;
    this.elementService.clear();
    this.logService.debug(`Cleared ${elementSize > 0 ? elementSize : 'no'} elements.`);

    return new WadCommandExecutorResult(true);
  }
}
