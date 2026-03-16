import { ChangeDetectorRef, Directive, inject, input, linkedSignal, signal } from '@angular/core';
import { WadRenderService } from '../../render.service';
import { WadBaseElementModel } from '../models/model';

@Directive({
  selector: '[appWadBaseElement]',
})
export class WadElementBaseDirective<T extends WadBaseElementModel> {
  protected changeDetection = inject(ChangeDetectorRef);
  protected rendering = inject(WadRenderService);

  model = input.required<T>();

  isActive = signal(false);

  strokeWidth = linkedSignal(() => (this.isActive() ? '2' : '1'));
}
