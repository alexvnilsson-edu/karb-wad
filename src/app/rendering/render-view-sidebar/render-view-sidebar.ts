import { Component, inject, linkedSignal } from '@angular/core';
import { WadElementService } from '../../wad/rendering/element.service';

@Component({
  selector: 'app-render-view-sidebar',
  templateUrl: './render-view-sidebar.html',
})
export class RenderViewSidebar {
  elementService = inject(WadElementService);

  elements = linkedSignal(() => this.elementService.elements());
}
