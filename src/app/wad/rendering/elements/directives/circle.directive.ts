import { computed, Directive } from '@angular/core';
import { WadCircleElementModel } from '../models/circle.model';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadCircleElement]',
  host: {
    '[attr.cx]': 'x()',
    '[attr.cy]': 'y()',
    '[attr.r]': 'radius()',
  },
})
export class WadCircleElementDirective extends WadElementBaseDirective<WadCircleElementModel> {
  x = computed(() => this.model().x);
  y = computed(() => this.renderService.translateCoordinateY(this.model().y));
  radius = computed(() => this.model().radius);
}
