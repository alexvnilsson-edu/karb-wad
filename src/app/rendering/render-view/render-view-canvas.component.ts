/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { WadRenderService } from 'app/wad/rendering/render.service';
import { Coordinates } from '../../wad/rendering/coordinate.type';

@Component({
  selector: 'svg[render-view-canvas]',
  imports: [],
  template: `<ng-content />`,
  host: {
    '[attr.viewBox]': 'viewBox$()',
    '[attr.width]': 'width$()',
    '[attr.height]': 'height$()',
  },
})
export class RenderViewCanvas {
  renderService = inject(WadRenderService);

  origin = input<Coordinates>(new Float32Array([0, 0]));
  scale = linkedSignal(() => this.renderService.scale());
  area = input<number[]>([0, 0]);

  width$ = computed(() => this.area()[0]);
  height$ = computed(() => this.area()[1]);

  viewBox$ = computed(() => [this.origin().join(' '), this.area().join(' ')].join(' '));
}
