import { Injectable, inject } from '@angular/core';
import { createCoordinates } from 'app/wad/rendering/coordinates.type';
import { WadElementService } from 'app/wad/rendering/element.service';
import { WadRectangleElementModel } from 'app/wad/rendering/elements/models';
import { WadCommand } from '../command';
import { WadCommandLogService } from '../logs/command-log.service';
import { WadCommandExecutorResult } from './command-executor-result';
import { WadCommandExecutor } from './command-executor.type';

@Injectable({ providedIn: 'root' })
export class WadTestCommandExecutor extends WadCommandExecutor {
  static ExecutorName = 'test';

  constructor() {
    super(WadTestCommandExecutor.ExecutorName);
  }

  elementService = inject(WadElementService);
  logService = inject(WadCommandLogService);

  execute(command: WadCommand) {
    const squareRoot: number = (command.arguments.get('n')?.value as number) ?? 48;

    this.logService.debug(
      $localize`[${WadTestCommandExecutor.ExecutorName}] number of elements: ${squareRoot ** 2}`,
    );

    this.logService.debug($localize`Clearing elements...`);

    for (const [_id, element] of this.elementService.elements()) {
      this.elementService.remove(element);
    }

    const length = 10;
    for (let row = 1; row <= squareRoot; row++) {
      const x = 10 + 10 * row;
      for (let col = 1; col <= squareRoot; col++) {
        const y = 10 + 10 * col;

        this.elementService.add(
          new WadRectangleElementModel(
            createCoordinates(x, y),
            createCoordinates(x, y + length),
            createCoordinates(x + length, y + length),
            createCoordinates(x + length, y),
          ),
        );
      }
    }

    return new WadCommandExecutorResult(true, '');
  }
}
