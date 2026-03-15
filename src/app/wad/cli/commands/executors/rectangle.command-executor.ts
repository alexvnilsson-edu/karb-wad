import { Injectable, inject } from '@angular/core';
import { Coordinates } from 'app/wad/rendering/coordinate.type';
import { WadElementService } from 'app/wad/rendering/element.service';
import { RectangleWadElementModel } from 'app/wad/rendering/rectangle';
import { WadCommand } from '../command';
import { WadCommandLogService } from '../logs/log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'any' })
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
      const element = new RectangleWadElementModel(a, b, c, d);
      this.elementService.add(element);

      this.logService.info(`Created rectangle (#${element.id})`);

      return new WadCommandExecutorResult(true, `Rectangle #${element.id} was created.`);
    } catch (ex) {
      this.logService.error(
        `Unable to create rectangle with arguments: ${Array.from(command.arguments.values())
          .map((arg) => [arg.name, arg.value].join('='))
          .join(' ')}`,
      );
      return new WadCommandExecutorResult(false, `Error creating rectangle: ${ex}`);
    }
  }
}
