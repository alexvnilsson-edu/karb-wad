/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { RenderService } from 'app/wad/rendering/render.service';
import { Coordinate } from '../../../wad/rendering/coordinate.type';

@Component({
  selector: 'svg[render-view-canvas]',
  imports: [],
  template: `<ng-content />`,
  host: {
    '[attr.viewBox]': 'viewBox$()',
    // '[attr.width]': 'width$()',
    // '[attr.height]': 'height$()',
  },
})
export class RenderViewCanvas {
  private renderService = inject(RenderService);

  origin = input<Coordinate>(new Float32Array([0, 0]));
  scale = linkedSignal(() => this.renderService.scale());
  area = input<number[]>([100, 100]);

  width$ = computed(() => this.area()[0]);
  height$ = computed(() => this.area()[1]);

  viewBoxArea$ = computed(() => this.getViewBoxArea());
  viewBox$ = computed(() => [this.origin().join(' '), this.viewBoxArea$().join(' ')].join(' '));

  private getViewBoxArea() {
    const scale = this.scale();
    return this.area().map((s) => s * scale);
  }
}
