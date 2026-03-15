import { Component, inject, linkedSignal } from '@angular/core';
import { ElementService } from '../../../wad/rendering/element.service';

@Component({
  selector: 'app-render-view-sidebar',
  templateUrl: './render-view-sidebar.component.html',
})
export class RenderViewSidebarComponent {
  elementService = inject(ElementService);

  elements = linkedSignal(() => this.elementService.elements());
}
