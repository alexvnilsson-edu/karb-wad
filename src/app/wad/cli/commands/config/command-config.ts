import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { WadCommandArgument } from '../arguments/command-argument';
import { WadCommand } from '../command';
import { WadCommandService } from '../command.service';
import {
  WadCircleCommandExecutor,
  WadLineCommandExecutor,
  WadRectangleCommandExecutor,
  WadResetCommandExecutor,
  WadTriangleCommandExecutor,
} from '../executors';
import { WadCommandExecutor } from '../executors/command-executor.type';
import { WadHelpCommandExecutor } from '../executors/help.command-executor';
import { WadTestCommandExecutor } from '../executors/test.command-executor';
import {
  configureCommandArgument,
  getCommandArgumentType,
  WadCommandArgumentConfig,
} from './command-argument-config';

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
      configureCommandArgument('origin', 'coordinates to center of circle', 'coordinate'),
      configureCommandArgument('radius', 'radius of circle', 'number'),
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
      configureCommandArgument('start', 'coordinates to start of line', 'coordinate'),
      configureCommandArgument('end', 'coordinates to end of line', 'coordinate'),
    ],
    executor: inject(WadLineCommandExecutor),
  },
  {
    name: 'rectangle',
    aliases: ['r', 'rect', 'rectangel', 'rektangel'],
    arguments: [
      configureCommandArgument('a', 'coordinates of first corner', 'coordinate'),
      configureCommandArgument('b', 'coordinates of second corner', 'coordinate'),
      configureCommandArgument('c', 'coordinates of third corner', 'coordinate'),
      configureCommandArgument('d', 'coordinates of fourth corner', 'coordinate'),
    ],
    executor: inject(WadRectangleCommandExecutor),
  },
  configureCommand('test', [], [], inject(WadTestCommandExecutor)),
  configureCommand('reset', [], [], inject(WadResetCommandExecutor)),
  configureCommand(
    'triangle',
    ['t', 'triangel'],
    [
      configureCommandArgument('a', 'coordinates of first corner', 'coordinate'),
      configureCommandArgument('b', 'coordinates of second corner', 'coordinate'),
      configureCommandArgument('c', 'coordinates of third corner', 'coordinate'),
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
      console.debug(`register command: ${config.name}`, config);
      commandService.register('command', command);
    });
  });
}

// export function configureCommandsOld(
//   commandService: WadCommandService,
//   elementService: WadElementService,
// ) {
//   const registrationFunctions = [
//     function registerCommandTransformers() {
//       commandService.registerTransformer('coordinates', new WadArgumentCoordinatesTransformer());
//       commandService.registerTransformer('number', new WadArgumentNumberTransformer());
//     },

//     function registerCircleCommand() {
//       const command = new WadCommand('circle', new Set(['c', 'circel', 'cirkel']));
//       command.registerArgument('origin', 'center coordinates', new WadCoordinatesArgumentType());
//       command.registerArgument('radius', 'radius', new WadNumberArgumentType());
//       command.executor = (command) => {
//         try {
//           const origin = command.arguments.get('origin');
//           const [x, y] = origin!.value;
//           const radius = command.arguments.get('radius')?.value;
//           const element = new CircleWadElementModel(x, y, radius);
//           elementService.add(element);

//           return new WadCommandExecutorResult(true, `Circle #${element.id} was created.`);
//         } catch (ex) {
//           return new WadCommandExecutorResult(false, `Error creating circle: ${ex}`);
//         }
//       };
//       commandService.register(command);
//     },

//     function registerHelpCommand() {
//       const command = new WadCommand('help', new Set(['h', 'hjälp']));
//       command.executor = () => {
//         const commands = Array.from(commandService.commands.keys()).filter(
//           (c) => c.toLowerCase() !== 'help',
//         );
//         const helpMessage = `Commands: ${commands.join(', ')}`;

//         return new WadCommandExecutorResult(true, helpMessage);
//       };
//       commandService.register(command);
//     },

//     function registerLineCommand() {
//       const command = new WadCommand('line', new Set(['l', 'li', 'linje']));
//       command.registerArgument('start', 'starting coordinates', new WadCoordinatesArgumentType());
//       command.registerArgument('end', 'ending coordinates', new WadCoordinatesArgumentType());
//       command.executor = (command) => {
//         try {
//           const [startX, startY] = command.arguments.get('start')?.value ?? [undefined, undefined];
//           const [endX, endY] = command.arguments.get('end')?.value ?? [undefined, undefined];
//           const element = new LineWadElementModel(startX, startY, endX, endY);
//           elementService.add(element);

//           return new WadCommandExecutorResult(true, `Line #${element.id} was created.`);
//         } catch (ex) {
//           return new WadCommandExecutorResult(false, `Error creating line: ${ex}`);
//         }
//       };
//       commandService.register(command);
//     },

//     function registerRectangleCommand() {
//       const command = new WadCommand(
//         'rectangle',
//         ['r', 'rect', 'rectangel', 'rektangel'],
//         [
//           new WadCommandArgument(
//             'a',
//             'coordinates of first corner',
//             new WadCoordinatesArgumentType(),
//           ),
//           new WadCommandArgument(
//             'b',
//             'coordinates of second corner',
//             new WadCoordinatesArgumentType(),
//           ),
//           new WadCommandArgument(
//             'c',
//             'coordinates of third corner',
//             new WadCoordinatesArgumentType(),
//           ),
//           new WadCommandArgument(
//             'd',
//             'coordinates of fourth corner',
//             new WadCoordinatesArgumentType(),
//           ),
//         ],
//       );
//       command.executor = rectangleCommandExecutor;
//       commandService.register(command);
//     },

//     function registerTestCommand() {
//       const command = new WadCommand(
//         'test',
//         (command, elementService, commandService) =>
//           testCommandExecutor(command, elementService, commandService),
//         ['t'],
//         [
//           new WadCommandArgument(
//             'n',
//             'square root of number of elements',
//             new WadNumberArgumentType(),
//           ),
//         ],
//       );
//       commandService.register(command);
//     },

//     function registerResetCommand() {
//       const command = new WadCommand('reset');
//       command.executor = () => {
//         elementService.elements().clear();
//         return new WadCommandExecutorResult(true, 'Elements cleared.');
//       };
//       commandService.register(command);
//     },

//     function registerTriangleCommand() {
//       const command = new WadCommand('triangle', new Set(['tri', 'triangel', 'trekant']));
//       command.registerArgument('a', 'first corner', new WadCoordinatesArgumentType());
//       command.registerArgument('b', 'second corner', new WadCoordinatesArgumentType());
//       command.registerArgument('c', 'third corner', new WadCoordinatesArgumentType());
//       command.executor = (command) => {
//         try {
//           const a = command.arguments.get('a')?.value;
//           const b = command.arguments.get('b')?.value;
//           const c = command.arguments.get('c')?.value;
//           const element = new TriangleWadElementModel(a, b, c);
//           elementService.add(element);

//           return new WadCommandExecutorResult(true, `Triangle #${element.id} was created.`);
//         } catch (ex) {
//           return new WadCommandExecutorResult(false, `Error creating triangle: ${ex}`);
//         }
//       };
//       commandService.register(command);
//     },
//   ];

//   registrationFunctions.forEach((func) => func());
// }
