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

      this.logService.info(`Created triangle (#${element.id})`);
      return new WadCommandExecutorResult(true, `Circle #${element.id} was created.`);
    } catch (ex) {
      this.logService.error(
        `Unable to create circle with arguments: ${Array.from(command.arguments.values())
          .map((arg) => [arg.name, arg.value].join('='))
          .join(' ')}`,
      );
      return new WadCommandExecutorResult(false, `Error creating circle: ${ex}`);
    }
  }
}
