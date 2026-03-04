import { WadCommand } from "./command";
import { WadCommandExecutorResult } from "./command-executor-result";

export type WadCommandExecutor = (command: WadCommand) => WadCommandExecutorResult;