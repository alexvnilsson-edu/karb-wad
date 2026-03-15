import { Component, inject, viewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RenderViewComponent } from './rendering/render-view/render-view.component';
import { CommandInput } from './wad/cli/command-input/command-input';
import { configureCommands } from './wad/cli/commands/command-config';
import { WadCommandService } from './wad/cli/commands/command.service';
import { WadElementService } from './wad/rendering/element.service';
import { WadModule } from './wad/wad.module';

@Component({
  selector: 'app-root',
  imports: [WadModule, MatToolbarModule, RenderViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(window:keyup.enter)': 'keyupEnter()',
  },
})
export class App {
  commandService = inject(WadCommandService);
  elementService = inject(WadElementService);

  commandInput = viewChild(CommandInput);

  constructor() {
    configureCommands(this.commandService, this.elementService);
  }

  keyupEnter() {
    if (this.commandInput()) {
      if (!this.commandInput()!.inFocus$()) {
        this.commandInput()!.setFocus();
      }
    }
  }
}
