import { Injectable, inject } from '@angular/core';
import { Coordinates } from 'app/wad/rendering/coordinates.type';
import { WadElementService } from 'app/wad/rendering/element.service';
import { WadTriangleElementModel } from 'app/wad/rendering/elements/models';
import { WadCommand } from '../command';
import { WadCommandLogService } from '../logs/command-log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'root' })
export class WadTriangleCommandExecutor extends WadCommandExecutor {
  static ExecutorName = 'triangle';

  constructor() {
    super(WadTriangleCommandExecutor.ExecutorName);
  }

  elementService = inject(WadElementService);
  logService = inject(WadCommandLogService);

  execute(command: WadCommand) {
    try {
      const [a, b, c] = [
        command.arguments.get('a')?.value as Coordinates,
        command.arguments.get('b')?.value as Coordinates,
        command.arguments.get('c')?.value as Coordinates,
      ];
      const element = new WadTriangleElementModel(a, b, c);
      this.elementService.add(element);

      this.logService.info(`Created triangle (#${element.id})`);
      return new WadCommandExecutorResult(true, `Rectangle #${element.id} was created.`);
    } catch (ex) {
      this.logService.error(
        `Unable to create triangle with arguments: ${Array.from(command.arguments.values())
          .map((arg) => [arg.name, arg.value].join('='))
          .join(' ')}`,
      );
      return new WadCommandExecutorResult(false, `Error creating rectangle: ${ex}`);
    }
  }
}
