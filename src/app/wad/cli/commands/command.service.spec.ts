import { WadElementService } from 'app/wad/rendering/element.service';
import { createCoordinates } from '../../rendering/coordinates.type';
import { WadArgumentCoordinatesTransformer } from './arguments/transformers';
import { WadCoordinatesArgumentType } from './arguments/types/coordinates.argument-type';
import { WadCommand } from './command';
import { WadCommandService } from './command.service';
import { WadCommandExecutorResult } from './executors/command-executor-result';
import { WadCommandArgument } from './arguments/command-argument';

describe('WadCommandService', () => {
  let commandService: WadCommandService;
  let elementService: WadElementService;

  beforeEach(() => {
    commandService = new WadCommandService();
    commandService.registerTransformer('coordinates', new WadArgumentCoordinatesTransformer());
  });

  it('should increment variable by executor', () => {
    const name = 'test';
    let x = 1;
    const command = new WadCommand(name);
    command.registerExecutor((_command, _elementService, _service) => {
      expect(command).not.toBeUndefined();
      expect(command.name).to.equal(name);
      x++;
      return new WadCommandExecutorResult(true);
    });
    commandService.register(command);
    commandService.execute(name);

    expect(x).toBe(2);
  });

  it('should find command by name', () => {
    const name = 'test';
    const command = new WadCommand(name, () ['t']);
    commandService.register(command);
    const found = commandService.find(name);
    expect(found).not.toBeUndefined();
    assert(found!.name === name);
  });

  it('should find command by alias', () => {
    const name = 'rectangle';
    const alias = 'rect';
    const command = new WadCommand(name, [alias]);
    commandService.register(command);
    const found = commandService.find(alias);
    expect(found).not.toBeUndefined();
    assert(found!.name === name);
    expect(commandService.find(alias + '2')).toBeUndefined();
  });

  it('should interpret string to command', () => {
    const input = 'test 25..50';
    const command = new WadCommand('test', [], [
      new WadCommandArgument('origin', 'origin of thing', new WadCoordinatesArgumentType())
    ]);
    command.registerArgument('origin', new WadCoordinatesArgumentType());
    commandService.register(command);
    const found = commandService.interpret(input);
    expect(found).not.toBeUndefined();
    expect(found.name).toBe('test');
    expect(found.arguments.get('origin')).not.toBeUndefined();
    expect(found.arguments.get('origin')!.value).toStrictEqual(createCoordinates(25, 50));
  });

  it('should have Coordinate transformer', () => {
    expect(commandService.transformers.keys()).toContain('coordinates');
  });
});
