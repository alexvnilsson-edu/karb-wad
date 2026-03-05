/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, linkedSignal } from '@angular/core';
import { createCoordinate } from './coordinate.type';
import { WadElement } from './element.component';
import { TriangleWadModel } from './triangle.model';

@Component({
  selector: '[wad-triangle]',
  template: ``,
  host: {
    '[attr.points]': 'points$()',
  },
  standalone: false,
})
export class TriangleWadElement extends WadElement<TriangleWadModel> {
  coordinates$ = linkedSignal(() =>
    this.model()
      ? [
          this.rendering.translateCoordinate(this.model()?.a ?? createCoordinate(0, 0)),
          this.rendering.translateCoordinate(this.model()?.b ?? createCoordinate(0, 0)),
          this.rendering.translateCoordinate(this.model()?.c ?? createCoordinate(0, 0)),
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
