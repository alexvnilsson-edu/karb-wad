import { Component, inject, linkedSignal } from '@angular/core';
import { createCoordinate } from '../../../wad/rendering/coordinate.type';
import { RenderService } from '../../../wad/rendering/render.service';

@Component({
  selector: 'app-render-view-status',
  templateUrl: './render-view-status.component.html',
})
export class RenderViewStatusComponent {
  private renderService = inject(RenderService);

  coord$ = linkedSignal(() => {
    const coord = this.renderService.coord() ?? createCoordinate(0, 0);
    return [coord[0].toFixed(1), coord[1].toFixed(1)];
  });

  scale$ = linkedSignal(() => `${this.renderService.scale().toFixed(0)}%`);

  origin$ = linkedSignal(() => {
    const origin = this.renderService.origin() ?? createCoordinate(0, 0);
    return [origin[0].toFixed(1), origin[1].toFixed(1)];
  });
}
