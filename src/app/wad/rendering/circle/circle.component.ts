/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, linkedSignal } from '@angular/core';
import { WadElementComponent } from '../element.component';
import { CircleWadElementModel } from './circle.model';

@Component({
  selector: '[wad-circle]',
  template: ``,
  host: {
    '[attr.cx]': 'x$()',
    '[attr.cy]': 'y$()',
    '[attr.r]': 'radius$()',
  },
  standalone: false,
})
export class CircleWadElementComponent extends WadElementComponent<CircleWadElementModel> {
  x$ = linkedSignal(() => this.model().x);
  y$ = linkedSignal(() => this.rendering.translateCoordinateY(this.model().y));
  radius$ = linkedSignal(() => this.model().radius);
}
