import { ChangeDetectionStrategy, Component, computed, ElementRef, HostBinding, inject, model, signal, viewChild } from '@angular/core';
import { WadCommandService } from '../commands/command.service';
import { FormsModule } from '@angular/forms';
import { stringify } from 'node:querystring';
import { CanvasClickEvent } from 'app/wad/rendering/canvas-click.event';
import { WadCoordinatesTransformer } from '../commands/transformers/coordinates.transformer';

@Component({
  selector: 'wad-command-input',
  templateUrl: "./command-input.html",
  styleUrl: './command-input.css',
  standalone: false,
  host: {
    "[class.active]": "inFocus$()",
    "[class.error]": "error$()"
  }
})
export class CommandInput {
  commandService = inject(WadCommandService);

  private coordinatesTransformer = new WadCoordinatesTransformer();

  inFocus$ = signal(false);

  error$ = signal(false);
  showResult$ = signal(false);
  message$ = signal("");

  isInputting = () => this.command !== "";

  commandInput = viewChild<ElementRef<HTMLInputElement>>("commandInput");

  command = "";

  constructor() {
    this.commandService.canvasClick.subscribe(event =>
      this.canvasClick(event)
    );
  }

  canvasClick(event: CanvasClickEvent) {
    if (this.isInputting()) {
      this.command += this.coordinatesTransformer.from(event.coordinates);

      if (this.commandInput() && this.commandInput()!.nativeElement) {
        this.commandInput()?.nativeElement.focus();
      } else {
        console.warn(`Unable to query command input element for focusing.`);
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

  protected reset() {
    this.error$.set(false);
    this.showResult$.set(false);
    this.message$.set("");
  }

  protected resetCommand() {
    this.command = "";
  }
}
