import { Injectable, inject } from '@angular/core';
import { Coordinates } from 'app/wad/rendering/coordinates.type';
import { WadElementService } from 'app/wad/rendering/element.service';
import { WadCircleElementModel } from 'app/wad/rendering/elements/models';
import { WadCommand } from '../command';
import { WadCommandLogService } from '../logs/command-log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'root' })
export class WadCircleCommandExecutor extends WadCommandExecutor {
  static ExecutorName = 'circle';

  constructor() {
    super(WadCircleCommandExecutor.ExecutorName);
  }

  elementService = inject(WadElementService);
  logService = inject(WadCommandLogService);

  execute(command: WadCommand) {
    try {
      const [[x, y], radius] = [
        command.arguments.get('origin')?.value as Coordinates,
        command.arguments.get('radius')?.value as number,
      ];
      const element = new WadCircleElementModel(x, y, radius);
      this.elementService.add(element);
      return new WadCommandExecutorResult(true);
    } catch (ex) {
      this.logService.error($localize`Unable to create element: ${ex}`);
      return new WadCommandExecutorResult(false);
    }
  }
}
