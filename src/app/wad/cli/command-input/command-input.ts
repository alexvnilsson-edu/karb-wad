import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CanvasClickEvent } from 'app/wad/rendering/canvas-click.event';
import { Coordinate } from '../../rendering/coordinate.type';
import { WadCommandService } from '../commands/command.service';
import { CoordinatesTransformer } from '../transformers/coordinates.transformer';

@Component({
  selector: 'wad-command-input',
  templateUrl: './command-input.html',
  styleUrl: './command-input.css',
  standalone: false,
  host: {
    '[class.active]': 'inFocus$()',
    '[class.error]': 'error$()',
  },
})
export class CommandInput {
  commandService = inject(WadCommandService);

  private coordinatesTransformer = new CoordinatesTransformer();

  inFocus$ = signal(false);

  error$ = signal(false);
  showResult$ = signal(false);
  message$ = signal('');

  isInputting = () => this.command !== '';

  commandInput = viewChild<ElementRef<HTMLInputElement>>('commandInput');

  command = '';

  constructor() {
    this.commandService.canvasClick.subscribe((event) => this.canvasClick(event));
  }

  canvasClick(event: CanvasClickEvent) {
    if (this.isInputting()) {
      if (event && event.coordinates) {
        const coordinate = event.coordinates;
        this.addCoordinate(coordinate);
        this.regainFocus();
      }
    }
  }

  enter() {
    try {
      const command = this.commandService.interpret(this.command);
      const result = command.execute();
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

  input() {
    this.reset();
  }

  focus(event: FocusEvent) {
    this.inFocus$.set(true);
  }

  blur(event: FocusEvent) {
    this.inFocus$.set(false);
  }

  protected addCoordinate(coordinate: Coordinate) {
    const padLeft = this.command.endsWith(' ') ? '' : ' ';
    const coordinateString = this.coordinatesTransformer.toString(coordinate);
    const commandAddition = padLeft + coordinateString;
    this.command += commandAddition;
  }

  protected regainFocus() {
    if (this.commandInput() && this.commandInput()!.nativeElement) {
      this.commandInput()?.nativeElement.focus();
    } else {
      console.warn(`Unable to query command input element for focusing.`);
    }
  }

  protected reset() {
    this.error$.set(false);
    this.showResult$.set(false);
    this.message$.set('');
  }

  protected resetCommand() {
    this.command = '';
  }
}
