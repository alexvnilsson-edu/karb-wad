import { Component, computed, inject, linkedSignal } from '@angular/core';
import { WadElement } from './element';
import { TriangleWadModel } from '../elements/triangle';
import { createCoordinate } from './coordinate';

@Component({
  selector: '[wad-triangle]',
  template: ``,
  host: {
    '[attr.points]': 'points$()',
  },
  standalone: false,
})
export class TriangleWadElement extends WadElement<TriangleWadModel> {
  coordinates$ = linkedSignal(() => {
    if (!this.getElement()) {
      return [createCoordinate(0, 0), createCoordinate(0, 0), createCoordinate(0, 0)];
    }

    const a = this.rendering.translateCoordinate(this.getElement().a);
    const b = this.rendering.translateCoordinate(this.getElement().b);
    const c = this.rendering.translateCoordinate(this.getElement().c);
    return [a, b, c];
  });

  points$ = computed(() => {
    if (!this.coordinates$()) {
      return '';
    }

    const coords = this.coordinates$().map((coord) => coord.join(' '));
    return coords.join(' ');
  });
}
