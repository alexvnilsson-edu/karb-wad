import { inject, Injectable } from '@angular/core';
import { Coordinates } from 'app/wad/rendering/coordinate.type';
import { WadElementService } from 'app/wad/rendering/element.service';
import { LineWadElementModel } from 'app/wad/rendering/line';
import { WadCommand } from '../command';
import { WadCommandLogService } from '../logs/command-log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'any' })
export class WadLineCommandExecutor extends WadCommandExecutor {
  static ExecutorName = 'line';

  constructor() {
    super(WadLineCommandExecutor.ExecutorName);
  }

  elementService = inject(WadElementService);
  logService = inject(WadCommandLogService);

  execute(command: WadCommand) {
    try {
      const [[startX, startY], [endX, endY]] = [
        command.arguments.get('start')?.value as Coordinates,
        command.arguments.get('end')?.value as Coordinates,
      ];
      const element = new LineWadElementModel(startX, startY, endX, endY);
      this.elementService.add(element);

      this.logService.info(`Created line (#${element.id})`);
      return new WadCommandExecutorResult(true, `Line #${element.id} was created.`);
    } catch (ex) {
      this.logService.error(
        `Unable to create line with arguments: ${Array.from(command.arguments.values())
          .map((arg) => [arg.name, arg.value].join('='))
          .join(' ')}`,
      );
      return new WadCommandExecutorResult(false, `Error creating line: ${ex}`);
    }
  }
}
