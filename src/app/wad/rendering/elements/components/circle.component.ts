import { Directive, linkedSignal } from '@angular/core';
import { WadCircleElementModel } from '../models/circle.model';
import { WadBaseElementComponent } from './base.component';

@Directive({
  selector: '[appWadCircle]',
  host: {
    '[attr.cx]': 'x$()',
    '[attr.cy]': 'y$()',
    '[attr.r]': 'radius$()',
  },
})
export class WadCircleElementComponent extends WadBaseElementComponent<WadCircleElementModel> {
  x$ = linkedSignal(() => this.model().x);
  y$ = linkedSignal(() => this.rendering.translateCoordinateY(this.model().y));
  radius$ = linkedSignal(() => this.model().radius);
}
