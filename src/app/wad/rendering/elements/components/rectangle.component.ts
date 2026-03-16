/* eslint-disable @angular-eslint/component-selector */
import { Component, linkedSignal } from '@angular/core';
import { WadRectangleElementModel } from '../models/rectangle.model';
import { WadBaseElementComponent } from './base.component';

@Component({
  selector: `[wad-rectangle]`,
  template: ``,
  host: {
    '[attr.points]': 'coordinates$()',
  },
})
export class WadRectangleElementComponent extends WadBaseElementComponent<WadRectangleElementModel> {
  coordinates$ = linkedSignal(() =>
    this.model()
      ? this.model()
          .getCoordinates()
          .map((coord) => this.rendering.translateCoordinate(coord))
      : undefined,
  );
}
