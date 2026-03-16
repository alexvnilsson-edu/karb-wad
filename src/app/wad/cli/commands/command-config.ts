import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { WadCommandArgument } from './arguments/command-argument';
import { WadCommand } from './command';
import {
  configureCommandArgument,
  getCommandArgumentType,
  WadCommandArgumentConfig,
} from './command-argument-config';
import { WadCommandService } from './command.service';
import {
  WadCircleCommandExecutor,
  WadLineCommandExecutor,
  WadRectangleCommandExecutor,
  WadResetCommandExecutor,
  WadTriangleCommandExecutor,
} from './executors';
import { WadCommandExecutor } from './executors/command-executor.type';
import { WadHelpCommandExecutor } from './executors/help.command-executor';
import { WadTestCommandExecutor } from './executors/test.command-executor';

export interface WadCommandConfig {
  name: string;
  aliases: string[];
  arguments: WadCommandArgumentConfig[];
  executor: WadCommandExecutor;
}

export const configureCommand = (
  name: string,
  aliases: string[],
  args: WadCommandArgumentConfig[],
  executor: WadCommandExecutor,
): WadCommandConfig => ({
  name,
  aliases,
  arguments: args,
  executor,
});

export const getCommandsForConfiguration = (): WadCommandConfig[] => [
  {
    name: 'circle',
    aliases: ['c', 'circel', 'cirkel'],
    arguments: [
      configureCommandArgument('origin', $localize`coordinates to center of circle`, 'coordinate'),
      configureCommandArgument('radius', $localize`radius of circle`, 'number'),
    ],
    executor: inject(WadCircleCommandExecutor),
  },
  {
    name: 'help',
    aliases: [],
    arguments: [],
    executor: inject(WadHelpCommandExecutor),
  },
  {
    name: 'line',
    aliases: ['l'],
    arguments: [
      configureCommandArgument('start', $localize`coordinates to start of line`, 'coordinate'),
      configureCommandArgument('end', $localize`coordinates to end of line`, 'coordinate'),
    ],
    executor: inject(WadLineCommandExecutor),
  },
  {
    name: 'rectangle',
    aliases: ['r', 'rect', 'rectangel', 'rektangel'],
    arguments: [
      configureCommandArgument('a', $localize`coordinates of first corner`, 'coordinate'),
      configureCommandArgument('b', $localize`coordinates of second corner`, 'coordinate'),
      configureCommandArgument('c', $localize`coordinates of third corner`, 'coordinate'),
      configureCommandArgument('d', $localize`coordinates of fourth corner`, 'coordinate'),
    ],
    executor: inject(WadRectangleCommandExecutor),
  },
  configureCommand(
    'test',
    [],
    [configureCommandArgument('n', $localize`number of elements (square root)`, 'number')],
    inject(WadTestCommandExecutor),
  ),
  configureCommand('reset', [], [], inject(WadResetCommandExecutor)),
  configureCommand(
    'triangle',
    ['t', 'triangel'],
    [
      configureCommandArgument('a', $localize`coordinates of first corner`, 'coordinate'),
      configureCommandArgument('b', $localize`coordinates of second corner`, 'coordinate'),
      configureCommandArgument('c', $localize`coordinates of third corner`, 'coordinate'),
    ],
    inject(WadTriangleCommandExecutor),
  ),
];

export function configureCommands(
  commands: WadCommandConfig[],
  environmentInjector: EnvironmentInjector,
) {
  runInInjectionContext(environmentInjector, () => {
    const commandService = inject(WadCommandService);
    commands.forEach((config) => {
      const command = new WadCommand(
        config.name,
        config.executor,
        config.aliases,
        config.arguments.map(
          (arg) =>
            new WadCommandArgument(arg.name, arg.description, getCommandArgumentType(arg.type)!),
        ),
      );
      commandService.register('command', command);
    });
  });
}
