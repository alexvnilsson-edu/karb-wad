import { Component, inject } from '@angular/core';
import { WadModule } from './wad/wad.module';
import { RenderViewComponent } from './rendering/render-view/render-view.component';
import { configureCommands } from './wad/cli/commands/command-config';
import { WadCommandService } from './wad/cli/commands/command.service';
import { ElementService } from './wad/rendering/element.service';

@Component({
  selector: 'app-root',
  imports: [WadModule, RenderViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private commandService = inject(WadCommandService);
  private elementService = inject(ElementService);

  constructor() {
    configureCommands(this.commandService, this.elementService);
  }
}
