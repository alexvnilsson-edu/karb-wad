import { ElementService } from "app/wad/elements/element.service";
import { WadCommand } from "./command";
import { WadCommandExecutorResult } from "./command-executor-result";
import { createCoordinate } from "app/wad/rendering/coordinate";
import { RectangleWadModel } from "app/wad/elements/rectangle";

export function testCommandExecutor(command: WadCommand, elementService: ElementService) {
  const elementCount = 1000;
  for (let i = 0; i < elementCount; i++) {

    elementService.add(new RectangleWadModel(
      createCoordinate(10, 10),
      createCoordinate(10, 20),
      createCoordinate(20, 20),
      createCoordinate(20, 10)
    ));
  }

  return new WadCommandExecutorResult(true, "Starting test...");
}
