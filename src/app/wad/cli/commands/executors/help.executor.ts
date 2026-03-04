import { WadCommand } from "../command";
import { WadCommandExecutorResult } from "../command-executor-result";
import { WadCommandExecutor } from "../command-executor.type";

export function helpCommandExecutor(command: WadCommand): WadCommandExecutorResult {
  const helpMessage = `
  Commands:
    - circle
    - line
    - rectangle
    - triangle
  `;

  return new WadCommandExecutorResult(true, helpMessage);
}
