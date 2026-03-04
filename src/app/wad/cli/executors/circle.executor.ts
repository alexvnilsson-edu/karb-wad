import { ElementStorageService } from "app/wad/elements/element-storage.service";
import { WadCommand } from "../command";
import { WadCommandExecutorResult } from "../command-executor-result";
import { CircleWadModel } from "app/wad/elements/circle";

export function circleCommandExecutor(command: WadCommand, elements: ElementStorageService): WadCommandExecutorResult {
  try {
    const origin = command.arguments.get("origin");
    const [x, y] = origin!.value;
    const radius = command.arguments.get("radius")?.value;
    const element = new CircleWadModel(x, y, radius);
    elements.add(element);

    return new WadCommandExecutorResult(true, `Circle #${element.id} was created.`);
  } catch (ex) {
    return new WadCommandExecutorResult(false, `Error creating circle: ${ex}`);
  }
}
