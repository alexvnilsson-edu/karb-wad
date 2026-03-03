import { ChangeDetectionStrategy, Component, HostBinding, signal } from '@angular/core';

@Component({
  selector: 'wad-command-input',
  templateUrl: "./command-input.html",
  styleUrl: './command-input.css',
  standalone: false,
})
export class CommandInput {
  @HostBinding("class.active")
  inFocus = signal(false);

  focus(event: FocusEvent) {
    console.debug("focus");
    this.inFocus.set(true);
  }

  blur(event: FocusEvent) {
    this.inFocus.set(false);
  }
}
