import { createCoordinate } from 'app/wad/rendering/coordinate.type';
import { WadElementService } from 'app/wad/rendering/element.service';
import { RectangleWadElementModel } from 'app/wad/rendering/rectangle/rectangle.model';
import { WadCommand } from './command';
import { WadCommandExecutorResult } from './command-executor-result';

export function testCommandExecutor(command: WadCommand, elementService: WadElementService) {
  const results: number[] = [];

  const squareRoot: number = command.arguments.get('n')?.value ?? 48;

  for (const [_id, element] of elementService.elements()) {
    elementService.remove(element);
  }

  const length = 10;
  for (let row = 1; row <= squareRoot; row++) {
    const x = 10 + 10 * row;
    for (let col = 1; col <= squareRoot; col++) {
      const y = 10 + 10 * col;

      elementService.add(
        new RectangleWadElementModel(
          createCoordinate(x, y),
          createCoordinate(x, y + length),
          createCoordinate(x + length, y + length),
          createCoordinate(x + length, y),
        ),
      );
    }
  }

  return new WadCommandExecutorResult(true, '');
}
