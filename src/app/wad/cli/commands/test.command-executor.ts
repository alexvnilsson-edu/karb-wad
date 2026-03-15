import { CircleWadModel } from 'app/wad/rendering/circle.model';
import { createCoordinate } from 'app/wad/rendering/coordinate.type';
import { ElementService } from 'app/wad/rendering/element.service';
import { RectangleWadModel } from 'app/wad/rendering/rectangle.model';
import { WadCommand } from './command';
import { WadCommandExecutorResult } from './command-executor-result';

export function testCommandExecutor(command: WadCommand, elementService: ElementService) {
  const results: number[] = [];

  const squareRoot: number = command.arguments.get('n')?.value ?? 48;

  const oldElements = elementService.elements();

  for (const [_id, element] of elementService.elements()) {
    elementService.remove(element);
  }

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

  oldElements.forEach((e) => elementService.add(e));

  return new WadCommandExecutorResult(true, '');
}

export function testRectanglesCommandExecutor(command: WadCommand, elementService: ElementService) {
  const results: number[] = [];

  const oldElements = elementService.elements();

  function clear() {
    for (const [_id, element] of elementService.elements()) {
      elementService.remove(element);
    }
  }

  clear();

  function perform(round: number, squareRoot: number) {
    console.debug(`[${testRectanglesCommandExecutor.name}] perform round #${round}...`);

    clear();

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
  }

  const start = Date.now();

  let totalDelay = 0;

  const rounds = [
    {
      index: 0,
      squareRoot: 12,
    },
    {
      index: 1,
      squareRoot: 24,
    },
    {
      index: 2,
      squareRoot: 48,
    },
  ];

  for (const round of rounds) {
    const delay = (round.index + 1) * 500;
    totalDelay += delay;
    setTimeout(function () {
      perform(round.index, round.squareRoot);
    }, delay);
  }

  setTimeout(() => {
    oldElements.forEach((e) => elementService.add(e));
  }, totalDelay);

  return new WadCommandExecutorResult(true, '');
}

export function testCirclesCommandExecutor(command: WadCommand, elementService: ElementService) {
  const rounds = 10;
  const results: number[] = [];

  const oldElements = elementService.elements();

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

      elementService.add(new CircleWadModel(x, y, 5));
    }
  }

  oldElements.forEach((e) => elementService.add(e));

  return new WadCommandExecutorResult(true, '');
}
