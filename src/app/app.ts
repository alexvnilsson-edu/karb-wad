import { Component, EnvironmentInjector, inject, viewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RenderView } from './rendering/render-view/render-view';
import { WadCommandInput } from './wad/cli/command-input/command-input';
import { configureCommands, getCommandsForConfiguration } from './wad/cli/commands/command-config';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, RenderView, WadCommandInput],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(window:keyup.enter)': 'onEnterKeyup()',
    '(window:keyup.escape)': 'onEscapeKeyup()',
  },
})
export class App {
  private environmentInjector = inject(EnvironmentInjector);
  commandInput = viewChild(WadCommandInput);

  constructor() {
    configureCommands(getCommandsForConfiguration(), this.environmentInjector);
  }

  onEnterKeyup() {
    if (this.commandInput()) {
      if (!this.commandInput()!.isActive$()) {
        this.commandInput()!.setFocus();
      }
    }
  }

  onEscapeKeyup() {
    if (this.commandInput()) {
      if (this.commandInput()!.isActive$()) {
        this.commandInput()!.deactivate();
      }
    }
  }
}
