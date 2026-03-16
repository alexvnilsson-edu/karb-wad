import { computed, Directive } from '@angular/core';
import { WadTriangleElementModel } from '../models';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadTriangleElement]',
  host: {
    '[attr.points]': 'points()',
  },
})
export class WadTriangleElementDirective extends WadElementBaseDirective<WadTriangleElementModel> {
  allPoints = computed(() =>
    this.model() ? [this.model().a, this.model().b, this.model().c] : undefined,
  );
  points = computed(() =>
    this.allPoints()
      ? this.allPoints()
          ?.map((coord) => coord.join(' '))
          .join(' ')
      : '',
  );
}
