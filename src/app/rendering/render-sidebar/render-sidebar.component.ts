import { Component, inject, linkedSignal } from '@angular/core';
import { WadElementService } from '../../wad/rendering/element.service';

@Component({
  selector: 'app-render-sidebar',
  templateUrl: './render-sidebar.component.html',
})
export class RenderSidebarComponent {
  elementService = inject(WadElementService);

  elements = linkedSignal(() => this.elementService.elements());
}
