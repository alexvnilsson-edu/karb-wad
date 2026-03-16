import { Injectable, inject } from '@angular/core';
import { Coordinates } from 'app/wad/rendering/coordinates.type';
import { WadElementService } from 'app/wad/rendering/element.service';
import { WadRectangleElementModel } from 'app/wad/rendering/elements/models';
import { WadCommand } from '../command';
import { WadCommandLogService } from '../logs/command-log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'root' })
export class WadRectangleCommandExecutor extends WadCommandExecutor {
  static ExecutorName = 'rectangle';

  constructor() {
    super(WadRectangleCommandExecutor.ExecutorName);
  }

  elementService = inject(WadElementService);
  logService = inject(WadCommandLogService);

  execute(command: WadCommand) {
    try {
      const [a, b, c, d] = [
        command.arguments.get('a')?.value as Coordinates,
        command.arguments.get('b')?.value as Coordinates,
        command.arguments.get('c')?.value as Coordinates,
        command.arguments.get('d')?.value as Coordinates,
      ];
      const element = new WadRectangleElementModel(a, b, c, d);
      this.elementService.add(element);

      this.logService.info($localize`Created rectangle (#${element.id})`);

      return new WadCommandExecutorResult(true, $localize`Rectangle #${element.id} was created.`);
    } catch (ex) {
      this.logService.error(
        $localize`Unable to create rectangle with arguments: ${Array.from(
          command.arguments.values(),
        )
          .map((arg) => [arg.name, arg.value].join('='))
          .join(' ')}`,
      );
      return new WadCommandExecutorResult(false, $localize`Error creating rectangle: ${ex}`);
    }
  }
}
