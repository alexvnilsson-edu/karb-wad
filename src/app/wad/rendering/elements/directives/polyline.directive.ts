import { computed, Directive } from '@angular/core';
import { WadPolylineElementModel } from '../models';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadPolylineElement]',
  host: {
    '[attr.points]': 'points()',
  },
})
export class WadPolylineElementDirective extends WadElementBaseDirective<WadPolylineElementModel> {
  points = computed(() =>
    this.model()
      .points.map((c) => this.renderService.translateCoordinate(c).join(','))
      .join(' '),
  );
}
