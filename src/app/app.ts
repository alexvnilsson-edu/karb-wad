import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RenderViewComponent } from './rendering/render-view/render-view.component';
import { configureCommands } from './wad/cli/commands/command-config';
import { WadCommandService } from './wad/cli/commands/command.service';
import { WadElementService } from './wad/rendering/element.service';
import { WadModule } from './wad/wad.module';

@Component({
  selector: 'app-root',
  imports: [WadModule, MatToolbarModule, RenderViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  commandService = inject(WadCommandService);
  elementService = inject(WadElementService);

  constructor() {
    configureCommands(this.commandService, this.elementService);
  }
}
