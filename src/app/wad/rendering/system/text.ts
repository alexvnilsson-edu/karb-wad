import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: '[wad-system-text]',
  template: `<ng-content />`,
  host: {
    '[attr.x]': 'x()',
    '[attr.y]': 'y()',
    '[attr.dx]': 'dx()',
    '[attr.dy]': 'dy()',
    '[attr.rotate]': 'rotate()',
    '[attr.lengthAdjust]': 'lengthAdjust()',
    '[attr.textLength]': 'textLength()',
  },
  standalone: false,
})
export class TextWadSystemElement {
  x = input<number>(0);
  y = input<number>(0);
  dx = input<number>(0);
  dy = input<number>(0);
  rotate = input<number>(0);
  lengthAdjust = input<string>('spacing');
  textLength = input<number | undefined>();
}
