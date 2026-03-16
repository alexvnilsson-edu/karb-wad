import { PercentPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { WadCoordinatesCommandArgumentTransformer } from 'app/wad/cli/commands/arguments/transformers';
import { createCoordinates } from '../../../wad/rendering/coordinates.type';
import { WadRenderService } from '../../../wad/rendering/render.service';

@Component({
  selector: 'app-render-view-status',
  templateUrl: './render-view-status.html',
  imports: [PercentPipe],
})
export class RenderViewStatus {
  private renderService = inject(WadRenderService);
  numberFormat = new Intl.NumberFormat();

  coords = computed(() => this.renderService.coord());
  coordsSeparator = WadCoordinatesCommandArgumentTransformer.CoordinateSeparator;

  coord$ = computed(() => {
    const coord = this.renderService.coord() ?? createCoordinates(0, 0);
    return [this.numberFormat.format(coord[0]), this.numberFormat.format(coord[1])].join(
      WadCoordinatesCommandArgumentTransformer.CoordinateSeparator,
    );
  });

  scale = computed(() => this.renderService.scale());

  origin$ = computed(() => {
    const origin = this.renderService.origin() ?? createCoordinates(0, 0);
    return [this.numberFormat.format(origin[0]), this.numberFormat.format(origin[1])].join(
      WadCoordinatesCommandArgumentTransformer.CoordinateSeparator,
    );
  });
}
