import { computed, Directive } from '@angular/core';
import { WadRectangleElementModel } from '../models';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadRectangleElement]',
  host: {
    '[attr.points]': 'coordinates()',
  },
})
export class WadRectangleElementDirective extends WadElementBaseDirective<WadRectangleElementModel> {
  coordinates = computed(() =>
    this.model()
      ? this.model()
          .getCoordinates()
          .map((coord) => this.renderService.translateCoordinate(coord))
      : undefined,
  );
}
