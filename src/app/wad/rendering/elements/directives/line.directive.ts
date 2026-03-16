import { computed, Directive } from '@angular/core';
import { WadLineElementModel } from '../models';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadLineElement]',
  host: {
    '[attr.x1]': 'x1()',
    '[attr.y1]': 'y1()',
    '[attr.x2]': 'x2()',
    '[attr.y2]': 'y2()',
    '[attr.length]': 'length()',
  },
})
export class WadLineElementDirective extends WadElementBaseDirective<WadLineElementModel> {
  x1 = computed(() => this.model()?.start[0] ?? 0);
  y1 = computed(() => this.renderService.translateCoordinateY(this.model()?.start[1]) ?? 0);

  x2 = computed(() => this.model()?.end[0] ?? 0);
  y2 = computed(() => this.renderService.translateCoordinateY(this.model()?.end[1]) ?? 0);

  length = computed(() => {
    const dx = this.x2() - this.x1();
    const dy = this.y2() - this.y1();
    return Math.sqrt(dx ** 2 + dy ** 2);
  });
}
