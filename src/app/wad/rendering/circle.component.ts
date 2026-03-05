/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, linkedSignal } from '@angular/core';
import { CircleWadModel } from './circle.model';
import { WadElement } from './element.component';

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
export class CircleleWadElement extends WadElement<CircleWadModel> {
  x$ = linkedSignal(() => this.model().x);
  y$ = linkedSignal(() => this.rendering.translateCoordinateY(this.model().y));
  radius$ = linkedSignal(() => this.model().radius);
}
