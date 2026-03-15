/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */

import { ChangeDetectorRef, Component, inject, input, linkedSignal, output } from '@angular/core';
import { WadElementClickEvent } from './element-click.event';
import { WadElementModel } from './element.model';
import { WadRenderService } from './render.service';

@Component({
  selector: '[wad-base]',
  template: ``,
  host: {
    fill: 'none',
    '[attr.stroke-width]': 'strokeWidth$()',
    '[attr.stroke]': 'stroke$()',
    '(click)': 'click()',
  },
  standalone: false,
})
export class WadElementComponent<TModel extends WadElementModel> {
  protected changeDetection = inject(ChangeDetectorRef);
  protected rendering = inject(WadRenderService);

  elementModel = input.required<WadElementModel>();

  model = linkedSignal<TModel>(() => this.elementModel() as TModel);

  elementClick = output<WadElementClickEvent>();

  isFocused$ = linkedSignal(() => this.model()?.isFocused ?? false);

  strokeWidth$ = linkedSignal(() => 1);

  stroke$ = linkedSignal(() => (this.isFocused$() ? 'rgb(255, 255, 255)' : 'rgb(200, 200, 200)'));

  protected click() {
    console.debug(`Element ${this.model()?.id || 'unknown id'} was clicked.`);

    if (this.model()) {
      const eventData: WadElementClickEvent = { element: this.model()! };
      console.debug(`Emitting event elementClick with data: `, eventData);
      this.elementClick.emit(eventData);
    }

    this.changeDetection.markForCheck();
  }
}
