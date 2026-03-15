/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
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
import { CanvasClickEvent } from 'app/wad/rendering/canvas-click.event';
import { Coordinates } from '../../rendering/coordinate.type';
import { WadCoordinatesCommandArgumentTransformer } from '../commands/arguments/transformers';
import { WadCommandService } from '../commands/command.service';

@Component({
  selector: 'wad-command-input',
  templateUrl: './command-input.html',
  styleUrl: './command-input.scss',
  standalone: false,
  host: {
    '[class.active]': 'inFocus$()',
    '[class.error]': 'error$()',
  },
})
export class WadCommandInput implements OnInit {
  commandService = inject(WadCommandService);

  private coordinatesTransformer = new WadCoordinatesCommandArgumentTransformer();

  inFocus$ = signal(false);

  error$ = signal(false);
  showResult$ = signal(false);
  message$ = signal('');

  isInputting = () => this.command.length > 0;

  inputPlaceholder$ = computed(() =>
    this.inFocus$() ? 'Type help for a list of commands' : `Press [Enter] to focus command window`,
  );

  commandInput = viewChild<ElementRef<HTMLInputElement>>('commandInput');

  command = '';

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

  setFocus() {
    if (this.commandInput() && this.commandInput()!.nativeElement) {
      this.commandInput()?.nativeElement.focus();
    } else {
      console.warn(`Unable to query command input element for focusing.`);
    }
  }

  onFocus(_event: FocusEvent) {
    this.inFocus$.set(true);
  }

  onBlur(_event: FocusEvent) {
    this.inFocus$.set(false);
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
}
