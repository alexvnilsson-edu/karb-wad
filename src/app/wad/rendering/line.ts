import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { WadElement } from './element';
import { LineWadModel } from '../elements/line';
import { RenderService } from './render.service';

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
export class LineWadElement extends WadElement<LineWadModel> {
  x1$ = linkedSignal(() => this.getElement()?.start[0] ?? 0);
  y1$ = linkedSignal(() => this.rendering.translateCoordinateY(this.getElement()?.start[1]) ?? 0);

  x2$ = linkedSignal(() => this.getElement()?.end[0] ?? 0);
  y2$ = linkedSignal(() => this.rendering.translateCoordinateY(this.getElement()?.end[1]) ?? 0);

  length$ = linkedSignal(() => {
    const dx = this.x2$() - this.x1$();
    const dy = this.y2$() - this.y1$();
    return Math.sqrt(dx ** 2 + dy ** 2);
  });
}
