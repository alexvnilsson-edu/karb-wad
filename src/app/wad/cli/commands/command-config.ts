import { CircleWadModel } from 'app/wad/elements/circle';
import { WadCommand } from './command';
import { WadCommandService } from './command.service';
import { CoordinatesTransformer } from '../transformers/coordinates.transformer';
import { NumberTransformer } from '../transformers/number.transformer';
import { WadCommandExecutorResult } from './command-executor-result';
import { RectangleWadModel } from 'app/wad/elements/rectangle';
import { TriangleWadModel } from 'app/wad/elements/triangle';
import { ElementService } from 'app/wad/elements/element.service';
import { LineWadModel } from 'app/wad/elements/line';
import { CoordinatesArgumentType } from './argument-types/coordinate.argument-type';
import { NumberArgumentType } from './argument-types/number.argument-type';

interface CommandConfig {
  name: string;
  alias: Array<string>;
  executor: Function;
}
type CommandConfigCollection = Array<CommandConfig>;

export function configureCommands(
  commandService: WadCommandService,
  elementService: ElementService,
) {
  const registrationFunctions = [
    function registerCommandTransformers() {
      commandService.registerTransformer('coordinates', new CoordinatesTransformer());
      commandService.registerTransformer('number', new NumberTransformer());
    },

    function registerCircleCommand() {
      const command = new WadCommand('circle', new Set(['circ', 'circel', 'cirkel']));
      command.registerArgument('origin', new CoordinatesArgumentType());
      command.registerArgument('radius', new NumberArgumentType());
      command.executor = (command) => {
        try {
          const origin = command.arguments.get('origin');
          const [x, y] = origin!.value;
          const radius = command.arguments.get('radius')?.value;
          const element = new CircleWadModel(x, y, radius);
          elementService.add(element);

          return new WadCommandExecutorResult(true, `Circle #${element.id} was created.`);
        } catch (ex) {
          return new WadCommandExecutorResult(false, `Error creating circle: ${ex}`);
        }
      };
      commandService.registerCommand(command);
    },

    function registerHelpCommand() {
      const command = new WadCommand('help', new Set(['h', 'hjälp']));
      command.executor = (command) => {
        const commands = Array.from(commandService.commands.keys()).filter(
          (c) => c.toLowerCase() !== 'help',
        );
        const helpMessage = `Commands: ${commands.join(', ')}`;

        return new WadCommandExecutorResult(true, helpMessage);
      };
      commandService.registerCommand(command);
    },

    function registerLineCommand() {
      const command = new WadCommand('line', new Set(['l', 'li', 'linje']));
      command.registerArgument('start', new CoordinatesArgumentType());
      command.registerArgument('end', new CoordinatesArgumentType());
      command.executor = (command) => {
        try {
          const [startX, startY] = command.arguments.get('start')?.value;
          const [endX, endY] = command.arguments.get('end')?.value;
          const element = new LineWadModel(startX, startY, endX, endY);
          elementService.add(element);

          return new WadCommandExecutorResult(true, `Line #${element.id} was created.`);
        } catch (ex) {
          return new WadCommandExecutorResult(false, `Error creating line: ${ex}`);
        }
      };
      commandService.registerCommand(command);
    },

    function registerRectangleCommand() {
      const command = new WadCommand('rectangle', new Set(['rect', 'rectangel', 'rektangel']));
      command.registerArgument('a', new CoordinatesArgumentType());
      command.registerArgument('b', new CoordinatesArgumentType());
      command.registerArgument('c', new CoordinatesArgumentType());
      command.registerArgument('d', new CoordinatesArgumentType());
      command.executor = (command) => {
        try {
          const [a, b, c, d] = [
            command.arguments.get('a')?.value,
            command.arguments.get('b')?.value,
            command.arguments.get('c')?.value,
            command.arguments.get('d')?.value,
          ];
          const element = new RectangleWadModel(a, b, c, d);
          elementService.add(element);

          return new WadCommandExecutorResult(true, `Rectangle #${element.id} was created.`);
        } catch (ex) {
          return new WadCommandExecutorResult(false, `Error creating rectangle: ${ex}`);
        }
      };
      commandService.registerCommand(command);
    },

    function registerTriangleCommand() {
      const command = new WadCommand('triangle', new Set(['tri', 'triangel', 'trekant']));
      command.registerArgument('a', new CoordinatesArgumentType());
      command.registerArgument('b', new CoordinatesArgumentType());
      command.registerArgument('c', new CoordinatesArgumentType());
      command.executor = (command) => {
        try {
          const a = command.arguments.get('a')?.value;
          const b = command.arguments.get('b')?.value;
          const c = command.arguments.get('c')?.value;
          const element = new TriangleWadModel(a, b, c);
          elementService.add(element);

          return new WadCommandExecutorResult(true, `Triangle #${element.id} was created.`);
        } catch (ex) {
          return new WadCommandExecutorResult(false, `Error creating triangle: ${ex}`);
        }
      };
      commandService.registerCommand(command);
    },
  ];

  for (const registrationFunction of registrationFunctions) {
    registrationFunction();
  }
}
