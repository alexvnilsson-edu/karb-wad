import {
  ChangeDetectorRef,
  computed,
  Directive,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { WadRenderService } from '../../render.service';
import { WadElementActivateEvent } from '../element-activate.event';
import { WadElementModel } from '../models/model';

@Directive({
  selector: '[appWadBaseElement]',
})
export class WadElementBaseDirective<T extends WadElementModel> {
  protected changeDetection = inject(ChangeDetectorRef);
  protected rendering = inject(WadRenderService);

  elementModel = input.required<WadElementModel>();
  model = computed(() => this.elementModel() as T);

  activate = output<WadElementActivateEvent>();

  isActive = signal(false);

  strokeWidth = linkedSignal(() => (this.isActive() ? '2' : '1'));
}
