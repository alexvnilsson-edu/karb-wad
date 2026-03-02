import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Coordinate } from '@wad/rendering/coordinate';

@Component({
  selector: 'svg[render-view-canvas]',
  imports: [],
  template: `<ng-content/>`,
  host: {
    "[attr.viewBox]": "viewBox$()",
    "[attr.width]": "width$()",
    "[attr.height]": "height$()"
  }
})
export class RenderViewCanvas {
  origin = input<Coordinate>(new Float32Array([0, 0]));
  area = input<Array<number>>([0, 0]);

  width$ = computed(() => this.area()[0]);
  height$ = computed(() => this.area()[1]);

  viewBox$ = computed(() => 
    [this.origin().join(" "), this.area().join(" ")].join(" ")
  );
}
