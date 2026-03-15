/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, linkedSignal } from '@angular/core';
import { createCoordinates } from '../coordinate.type';
import { WadElementComponent } from '../element.component';
import { TriangleWadElementModel } from './triangle.model';

@Component({
  selector: '[wad-triangle]',
  template: ``,
  host: {
    '[attr.points]': 'points$()',
  },
  standalone: false,
})
export class TriangleWadElementComponent extends WadElementComponent<TriangleWadElementModel> {
  coordinates$ = linkedSignal(() =>
    this.model()
      ? [
          this.rendering.translateCoordinate(this.model()?.a ?? createCoordinates(0, 0)),
          this.rendering.translateCoordinate(this.model()?.b ?? createCoordinates(0, 0)),
          this.rendering.translateCoordinate(this.model()?.c ?? createCoordinates(0, 0)),
        ]
      : undefined,
  );

  points$ = linkedSignal(
    () =>
      this.coordinates$()
        ?.map((coord) => coord.join(' '))
        .join(' ') ?? '',
  );
}
