import { Component, inject, linkedSignal } from '@angular/core';
import { createCoordinates } from '../../../wad/rendering/coordinate.type';
import { WadRenderService } from '../../../wad/rendering/render.service';

@Component({
  selector: 'app-render-view-status',
  templateUrl: './render-view-status.component.html',
})
export class RenderViewStatusComponent {
  private renderService = inject(WadRenderService);

  coord$ = linkedSignal(() => {
    const coord = this.renderService.coord() ?? createCoordinates(0, 0);
    return [coord[0].toFixed(1), coord[1].toFixed(1)];
  });

  scale$ = linkedSignal(() => `${this.renderService.scale().toFixed(0)}%`);

  origin$ = linkedSignal(() => {
    const origin = this.renderService.origin() ?? createCoordinates(0, 0);
    return [origin[0].toFixed(1), origin[1].toFixed(1)];
  });
}
