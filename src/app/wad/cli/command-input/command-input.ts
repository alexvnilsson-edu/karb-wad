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
  showResult$ = signal(false);
  message$ = signal("");

  command = "";

  protected reset() {
    this.error$.set(false);
    this.showResult$.set(false);
    this.message$.set("");
  }

  protected resetCommand() {
    this.command = "";
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
}
