/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, linkedSignal } from '@angular/core';
import { WadElementComponent } from '../element.component';
import { RectangleWadElementModel } from './rectangle.model';

@Component({
  selector: `[wad-rectangle]`,
  template: ``,
  host: {
    '[attr.points]': 'coordinates$()',
  },
  standalone: false,
})
export class RectangleWadElementComponent extends WadElementComponent<RectangleWadElementModel> {
  coordinates$ = linkedSignal(() =>
    this.model()
      ? this.model()
          .getCoordinates()
          .map((coord) => this.rendering.translateCoordinate(coord))
      : undefined,
  );
}
