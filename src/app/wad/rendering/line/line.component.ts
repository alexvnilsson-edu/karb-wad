/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, linkedSignal } from '@angular/core';
import { WadElementComponent } from '../element.component';
import { LineWadElementModel } from './line.model';

@Component({
  selector: '[wad-line]',
  template: ``,
  host: {
    '[attr.x1]': 'x1$()',
    '[attr.y1]': 'y1$()',
    '[attr.x2]': 'x2$()',
    '[attr.y2]': 'y2$()',
    '[attr.length]': 'length$()',
  },
  standalone: false,
})
export class LineWadElementComponent extends WadElementComponent<LineWadElementModel> {
  x1$ = linkedSignal(() => this.model()?.start[0] ?? 0);
  y1$ = linkedSignal(() => this.rendering.translateCoordinateY(this.model()?.start[1]) ?? 0);

  x2$ = linkedSignal(() => this.model()?.end[0] ?? 0);
  y2$ = linkedSignal(() => this.rendering.translateCoordinateY(this.model()?.end[1]) ?? 0);

  length$ = linkedSignal(() => {
    const dx = this.x2$() - this.x1$();
    const dy = this.y2$() - this.y1$();
    return Math.sqrt(dx ** 2 + dy ** 2);
  });
}
