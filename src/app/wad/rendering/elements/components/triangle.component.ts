/* eslint-disable @angular-eslint/component-selector */

import { Component, linkedSignal } from '@angular/core';
import { createCoordinates } from '../../coordinates.type';
import { WadTriangleElementModel } from '../models/triangle.model';
import { WadBaseElementComponent } from './base.component';

@Component({
  selector: '[wad-triangle]',
  template: ``,
  host: {
    '[attr.points]': 'points$()',
  },
})
export class WadTriangleElementComponent extends WadBaseElementComponent<WadTriangleElementModel> {
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
