import {
  ChangeDetectorRef,
  computed,
  Directive,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { WadRenderService } from '../../render.service';
import { WadElementActivateEvent } from '../element-activate.event';
import { WadElementModel } from '../models/model';

@Directive({
  selector: '[appWadBaseElement]',
  host: {
    '[attr.stroke]': 'stroke()',
    '[attr.stroke-width]': 'strokeWidth()',
    '(click)': 'onClick()',
  },
})
export class WadElementBaseDirective<T extends WadElementModel> {
  protected changeDetection = inject(ChangeDetectorRef);
  protected renderService = inject(WadRenderService);

  elementModel = input.required<WadElementModel>();
  model = computed(() => this.elementModel() as T);

  activate = output<WadElementActivateEvent>();

  isActive = signal(false);

  stroke = computed(() => (this.isActive() ? 'rgb(255, 255, 255)' : 'rgb(200, 200, 200)'));
  strokeWidth = computed(() => (this.isActive() ? '2' : '1'));

  onClick() {
    console.debug(`Element ${this.model().id} clicked.`);
  }
}
