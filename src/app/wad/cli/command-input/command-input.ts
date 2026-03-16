import {
  Component,
  computed,
  ElementRef,
  inject,
  linkedSignal,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanvasClickEvent } from 'app/wad/rendering/canvas-click.event';
import { Coordinates } from '../../rendering/coordinates.type';
import { WadCommandLog } from '../command-log/command-log';
import { WadCoordinatesCommandArgumentTransformer } from '../commands/arguments/transformers';
import { WadCommandService } from '../commands/command.service';

@Component({
  selector: 'app-wad-command-input',
  templateUrl: './command-input.html',
  styleUrl: './command-input.scss',
  imports: [FormsModule, WadCommandLog],
  host: {
    '[class.active]': 'isActive$()',
  },
})
export class WadCommandInput implements OnInit {
  commandService = inject(WadCommandService);

  private coordinatesTransformer = new WadCoordinatesCommandArgumentTransformer();

  isActive$ = signal(false);

  error$ = signal(false);
  showResult$ = signal(false);
  message$ = signal('');

  isInputting = () => this.command.length > 0;

  inputPlaceholder$ = computed(() =>
    this.isActive$()
      ? $localize`Enter command or press [Escape] to close`
      : $localize`Press [Enter] to open`,
  );

  commandInputElement = viewChild<ElementRef<HTMLInputElement>>('wadCommandInput');

  command = '';

  private _commandHistory = signal<string[]>([]);
  readonly commandHistory$ = this._commandHistory.asReadonly();

  commandPreviewName$ = signal('');
  commandPreview$ = linkedSignal(() => {
    if (this.commandPreviewName$()) {
      return this.commandService.find(this.commandPreviewName$());
    }

    return undefined;
  });

  constructor() {
    this.commandService.canvasClick.subscribe((event) => this.canvasClick(event));
  }

  ngOnInit() {
    this.commandService.logs.info(`Type help for commands`);
  }

  canvasClick(event: CanvasClickEvent) {
    if (this.isInputting()) {
      if (event && event.coordinates) {
        const coordinate = event.coordinates;
        this.addCoordinate(coordinate);
        this.setFocus();
      }
    }
  }

  onInput() {
    this.reset();

    if (this.command.length > 0) {
      const args = this.command.split(' ');
      if (args.length > 1) {
        const commandName = args[0];
        const command = this.commandService.find(commandName);
        if (command) {
          this.commandPreviewName$.set(commandName);
        } else {
          this.commandPreviewName$.set('');
        }
      } else {
        this.commandPreviewName$.set('');
      }
    }
  }

  onEnterKeyup() {
    try {
      this.appendCommandHistory(this.command);
      const command = this.commandService.interpret(this.command);
      const result = this.commandService.execute(command);
      if (result.success) {
        this.resetCommand();
        if (result.message) {
          this.showResult$.set(true);
          this.message$.set(result.message!);
        }
      } else {
        this.error$.set(true);
      }
    } catch (ex: unknown) {
      this.error$.set(true);
      this.message$.set(`${ex}`);
    }
  }

  onEscapeKeyup() {
    this.deactivate();
  }

  deactivate() {
    this.isActive$.set(false);

    if (this.commandInputElement() && this.commandInputElement()!.nativeElement) {
      this.commandInputElement()!.nativeElement.blur();
    }
  }

  setFocus() {
    if (this.commandInputElement() && this.commandInputElement()!.nativeElement) {
      this.commandInputElement()?.nativeElement.focus();
    } else {
      console.warn(`Unable to query command input element for focusing.`);
    }
  }

  onFocus(_event: FocusEvent) {
    this.isActive$.set(true);
  }

  protected addCoordinate(coordinate: Coordinates) {
    const padLeft = this.command.endsWith(' ') ? '' : ' ';
    const coordinateString = this.coordinatesTransformer.toString(coordinate);
    const commandAddition = padLeft + coordinateString;
    this.command += commandAddition;
  }

  protected reset() {
    this.error$.set(false);
    this.showResult$.set(false);
    this.message$.set('');
  }

  protected resetCommand() {
    this.command = '';
    this.commandPreviewName$.set('');
  }

  private appendCommandHistory(command: string) {
    this._commandHistory.update((history) => {
      history.push(command);
      return history;
    });
  }
}
