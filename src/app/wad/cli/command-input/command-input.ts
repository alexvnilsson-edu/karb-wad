import { ChangeDetectionStrategy, Component, HostBinding, inject, model, signal } from '@angular/core';
import { WadCommandService } from '../commands/command.service';
import { FormsModule } from '@angular/forms';
import { stringify } from 'node:querystring';

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

  inFocus$ = signal(false);
  error$ = signal(false);
  errorMessage$ = signal("");

  command = "";

  protected reset() {
    this.command = "";
    this.error$.set(false);
    this.errorMessage$.set("");
  }

  enter() {
    try {
      const command = this.commandService.interpret(this.command);
      const result = command.execute();
      if (result.success) {
        this.reset();
        this.error$.set(false);
      } else {
        console.debug("error");
        this.error$.set(true);
      }
    } catch (ex: unknown) {
      this.error$.set(true);
      this.errorMessage$.set(`${ex}`);
    }
  }

  focus(event: FocusEvent) {
    this.inFocus$.set(true);
  }

  blur(event: FocusEvent) {
    this.inFocus$.set(false);
  }
}
