import { ChangeDetectionStrategy, Component, HostBinding, inject, model, signal } from '@angular/core';
import { WadCommandService } from '../commands/command.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'wad-command-input',
  templateUrl: "./command-input.html",
  styleUrl: './command-input.css',
  standalone: false,
  host: {
    "[class.active]": "inFocus()"
  }
})
export class CommandInput {
  commandService = inject(WadCommandService);

  inFocus = signal(false);

  command = "";

  protected reset() {
    this.command = "";
  }

  enter() {
    console.debug(this.command);
    const command = this.commandService.interpret(this.command);
    console.debug(command);
    this.reset();
  }

  focus(event: FocusEvent) {
    console.debug("focus");
    this.inFocus.set(true);
  }

  blur(event: FocusEvent) {
    this.inFocus.set(false);
  }
}
