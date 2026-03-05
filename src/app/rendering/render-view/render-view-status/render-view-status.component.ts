import { Component, computed, inject, linkedSignal } from '@angular/core';
import { RenderService } from '../../../wad/rendering/render.service';
import { createCoordinate } from '../../../wad/rendering/coordinate';

@Component({
  selector: 'app-render-view-status',
  templateUrl: './render-view-status.component.html',
})
export class RenderViewStatusComponent {
  private rendering = inject(RenderService);

  coord = linkedSignal(() => {
    if (!this.rendering.coord()) {
      return createCoordinate(0, 0);
    }

    return this.rendering.coord();
  });

  origin = linkedSignal(() => {
    if (!this.rendering.origin()) {
      return createCoordinate(0, 0);
    }

    return this.rendering.origin();
  });
}
