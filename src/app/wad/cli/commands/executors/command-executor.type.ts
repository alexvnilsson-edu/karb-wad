import { WadCommand } from '../command';
import { WadCommandExecutorResult } from './command-executor-result';

/**
 * Command executor.
 */
export type WadCommandExecutorType = (command: WadCommand) => WadCommandExecutorResult;

export abstract class WadCommandExecutor {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract execute(command: WadCommand): WadCommandExecutorResult;
}
