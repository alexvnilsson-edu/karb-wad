/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, linkedSignal } from '@angular/core';
import { WadElementComponent } from '../element.component';
import { LineWadElementModel } from '../line/line.model';

@Component({
  selector: '[wad-polyline]',
  template: ``,
  host: {
    '[attr.points]': 'points$()',
  },
  standalone: false,
})
export class PolylineWadElement extends WadElementComponent<LineWadElementModel> {
  points$ = linkedSignal(() => {
    return [this.model()?.start ?? [0, 0], this.model()?.end ?? [0, 0]]
      .map((c) => this.rendering.translateCoordinate(c))
      .map((c) => c.join(','))
      .join(' ');
  });
}
