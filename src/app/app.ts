import { Component, EnvironmentInjector, inject, viewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RenderViewComponent } from './rendering/render-view/render-view.component';
import { WadCommandInput } from './wad/cli/command-input/command-input';
import {
  configureCommands,
  getCommandsForConfiguration,
} from './wad/cli/commands/config/command-config';
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
  private environmentInjector = inject(EnvironmentInjector);
  commandInput = viewChild(WadCommandInput);

  constructor() {
    configureCommands(getCommandsForConfiguration(), this.environmentInjector);
  }

  keyupEnter() {
    if (this.commandInput()) {
      if (!this.commandInput()!.inFocus$()) {
        this.commandInput()!.setFocus();
      }
    }
  }
}
