import { ElementService } from 'app/wad/elements/element.service';
import { WadCommand } from './command';
import { WadCommandExecutorResult } from './command-executor-result';
import { createCoordinate } from 'app/wad/rendering/coordinate';
import { RectangleWadModel } from 'app/wad/elements/rectangle';

export function testCommandExecutor(command: WadCommand, elementService: ElementService) {
  const rounds = 10;
  const results: number[] = [];

  for (const [_id, element] of elementService.elements()) {
    elementService.remove(element);
  }

  const start = Date.now();
  const squareRoot = 48;
  const length = 10;
  for (let row = 1; row <= squareRoot; row++) {
    const x = 10 + 10 * row;
    for (let col = 1; col <= squareRoot; col++) {
      const y = 10 + 10 * col;

      elementService.add(
        new RectangleWadModel(
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
