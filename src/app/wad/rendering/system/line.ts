/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, input } from '@angular/core';

@Component({
  selector: '[wad-system-line]',
  template: ``,
  host: {
    '[attr.x1]': 'x1()',
    '[attr.y1]': 'y1()',
    '[attr.x2]': 'x2()',
    '[attr.y2]': 'y2()',
    '[attr.length]': 'length()',
  },
  standalone: false,
})
export class LineWadSystemElement {
  x1 = input.required<number>();
  y1 = input.required<number>();

  x2 = input.required<number>();
  y2 = input.required<number>();

  length = input<number>();
}
