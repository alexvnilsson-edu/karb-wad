import { ChangeDetectionStrategy, Component, HostBinding, inject, signal } from '@angular/core';
import { WadCommandService } from '../commands/command.service';

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

  prompt$ = 

  focus(event: FocusEvent) {
    console.debug("focus");
    this.inFocus.set(true);
  }

  blur(event: FocusEvent) {
    this.inFocus.set(false);
  }
}
