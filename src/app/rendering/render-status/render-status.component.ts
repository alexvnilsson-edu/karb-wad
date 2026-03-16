import { Component, computed, inject } from '@angular/core';
import { WadCoordinatesCommandArgumentTransformer } from 'app/wad/cli/commands/arguments/transformers';
import { createCoordinates } from '../../wad/rendering/coordinate.type';
import { WadRenderService } from '../../wad/rendering/render.service';

@Component({
  selector: 'app-render-status',
  templateUrl: './render-status.component.html',
})
export class RenderStatusComponent {
  private renderService = inject(WadRenderService);
  numberFormat = new Intl.NumberFormat();

  coord$ = computed(() => {
    const coord = this.renderService.coord() ?? createCoordinates(0, 0);
    return [this.numberFormat.format(coord[0]), this.numberFormat.format(coord[1])].join(
      WadCoordinatesCommandArgumentTransformer.CoordinateSeparator,
    );
  });

  scale$ = computed(() => `${this.numberFormat.format(this.renderService.scale())}%`);

  origin$ = computed(() => {
    const origin = this.renderService.origin() ?? createCoordinates(0, 0);
    return [this.numberFormat.format(origin[0]), this.numberFormat.format(origin[1])].join(
      WadCoordinatesCommandArgumentTransformer.CoordinateSeparator,
    );
  });
}
