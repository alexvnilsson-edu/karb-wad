import { ChangeDetectionStrategy, Component, HostBinding, signal } from '@angular/core';

@Component({
  selector: 'wad-command-input',
  templateUrl: "./command-input.html",
  styleUrl: './command-input.css',
  standalone: false,
  host: {
    "[class.active]": "inFocus()",
    'window:keyup': 'onKeyup()'
  }
})
export class CommandInput {
  inFocus = signal(false);

  onKeyup(event: KeyboardEvent) {
    console.debug("enter");
  }

  focus(event: FocusEvent) {
    console.debug("focus");
    this.inFocus.set(true);
  }

  blur(event: FocusEvent) {
    this.inFocus.set(false);
  }
}
