import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { WadModel } from '../elements/element';
import { RenderService } from './render.service';
import { ElementStorageService } from '../elements/element-storage.service';
import { WadElementClickEvent } from '../elements/element-click.event';

@Component({
  selector: '[wad-base]',
  template: ``,
  host: {
    fill: 'none',
    '[attr.stroke-width]': 'strokeWidth$()',
    '[attr.stroke]': 'stroke$()',
    '(click)': 'click($event)',
  },
  standalone: false,
})
export class WadElement<TElement extends WadModel> {
  protected changeDetection = inject(ChangeDetectorRef);
  protected rendering = inject(RenderService);

  element = input.required<WadModel>();

  elementClick = output<WadElementClickEvent>();

  isFocused$ = linkedSignal(() => this.element()?.isFocused ?? false);

  strokeWidth$ = linkedSignal(() => 2);

  stroke$ = linkedSignal(() => (this.isFocused$() ? 'rgb(255, 255, 255)' : 'rgb(200, 200, 200)'));

  protected click(event: MouseEvent) {
    console.debug(`Element ${this.element()?.id || 'unknown id'} was clicked.`);

    if (this.element()) {
      const eventData: WadElementClickEvent = { element: this.element()! };
      console.debug(`Emitting event elementClick with data: `, eventData);
      this.elementClick.emit(eventData);
    }

    this.changeDetection.markForCheck();
  }

  protected getElement(): TElement {
    return this.element() as TElement;
  }
}
