import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { RenderService } from '@wad/rendering/render.service';

@Component({
  selector: '[render-view-svg]',
  imports: [],
  template: ``,
  host: {
    "[attr.viewBox]": "viewBox()",
    "[attr.width]": "width()",
    "[attr.height]": "height()"
  }
})
export class RenderViewSvg {
  renderService = inject(RenderService);
  orginXY = linkedSignal(() => this.renderService.origin().join(" "));
  area = linkedSignal(() => this.renderService.area().join(" "));
  width = linkedSignal(() => this.renderService.area()[0]);
  height = linkedSignal(() => this.renderService.area()[1]);

  viewBox = linkedSignal(() => `${this.orginXY()} ${this.area()}`);
}
