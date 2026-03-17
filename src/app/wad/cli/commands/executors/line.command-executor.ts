import { inject, Injectable } from '@angular/core';
import { Coordinates } from 'app/wad/rendering/coordinates.type';
import { WadElementService } from 'app/wad/rendering/element.service';
import { WadPolylineElementModel } from 'app/wad/rendering/elements/models';
import { WadCommand } from '../command';
import { WadCommandLogService } from '../logs/command-log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'root' })
export class WadLineCommandExecutor extends WadCommandExecutor {
  static ExecutorName = 'line';

  constructor() {
    super(WadLineCommandExecutor.ExecutorName);
  }

  elementService = inject(WadElementService);
  logService = inject(WadCommandLogService);

  execute(command: WadCommand) {
    try {
      const [start, end] = [
        command.arguments.get('start')?.value as Coordinates,
        command.arguments.get('end')?.value as Coordinates,
      ];
      const element = new WadPolylineElementModel([start, end]);
      this.elementService.add(element);

      this.logService.info($localize`Created line (#${element.id})`);
      return new WadCommandExecutorResult(true, `Line #${element.id} was created.`);
    } catch (ex) {
      this.logService.error(
        $localize`Unable to create line with arguments: ${Array.from(command.arguments.values())
          .map((arg) => [arg.name, arg.value].join('='))
          .join(' ')}`,
      );
      return new WadCommandExecutorResult(false, $localize`Error creating line: ${ex}`);
    }
  }
}
