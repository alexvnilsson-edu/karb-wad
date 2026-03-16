/* eslint-disable @angular-eslint/component-selector */

import { ChangeDetectorRef, Component, inject, input, linkedSignal, output } from '@angular/core';
import { WadRenderService } from '../../render.service';
import { WadElementActivateEvent } from '../element-activate.event';
import { WadElementModel } from '../models/model';

@Component({
  selector: '[app-wad-base]',
  template: ``,
  host: {
    '[attr.stroke-width]': 'strokeWidth$()',
    '[attr.stroke]': 'stroke$()',
    '[attr.stroke-dasharray]': 'strokeDashArray$()',
    '(click)': 'click()',
    // '(pointerdown)': 'onPointerDown($event)',
    // '(pointermove)': 'onPointerMove($event)',
    // '(pointerup)': 'onPointerUp($event)',
  },
})
export class WadBaseElementComponent<TModel extends WadElementModel> {
  protected changeDetection = inject(ChangeDetectorRef);
  protected rendering = inject(WadRenderService);

  elementModel = input.required<WadElementModel>();

  model = linkedSignal<TModel>(() => this.elementModel() as TModel);

  elementClick = output<WadElementActivateEvent>();

  isFocused$ = linkedSignal(() => this.model()?.isFocused ?? false);

  strokeWidth$ = linkedSignal(() => 2);
  strokeDashArray$ = linkedSignal(() => (this.isFocused$() ? '2' : undefined));
  stroke$ = linkedSignal(() => (this.isFocused$() ? 'rgb(200, 200, 255)' : 'rgb(200, 200, 200)'));

  protected click() {
    console.debug(`Element ${this.model()?.id || 'unknown id'} was clicked.`);

    if (this.model()) {
      const eventData: WadElementActivateEvent = { element: this.model()! };
      console.debug(`Emitting event elementClick with data: `, eventData);
      this.elementClick.emit(eventData);
    }

    this.changeDetection.markForCheck();
  }

  // onPointerDown(event: PointerEvent) {}

  // onPointerMove(event: PointerEvent) {
  //   const [dx, dy] = [event.movementX, event.movementY];
  // }

  // onPointerUp(event: PointerEvent) {}
}
